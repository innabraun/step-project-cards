import doc from '../../../img/white-man-doctor-in-the-medical-interior-of-the-hospital-holds-a-laptop-cartoon-person-3d-rendering_187882-1432.jpg';
import doc2 from '../../../img/male-african-doctor-in-the-medical-interior-of-the-hospital-open-palm-copy-space-cartoon-person_187882-1244.jpg';
import { isTokenInLocalStorage } from '../helper';
import API from '../ApiClass';
import { Cards } from '../ClassCard';
import { Component } from '../loginDialog/FormComponents';

export class Border extends Component {
  checkCards = async () => {
    try {
      const cards = await API.getRequest();
      return cards.length === 0 && isTokenInLocalStorage();
    } catch (e) {
      console.log(e);
    }
  };

  getCards = async () => {
    try {
      const data = await API.getRequest();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  async render() {
    const borderItem = document.querySelector('.border__item');
    const noCards = this.createElement('span', { className: 'no__cards-item' });
    const image = this.createElement('img', {
      className: 'border__img',
      src: !isTokenInLocalStorage() ? doc : doc2,
    });
    const withCards = this.createElement('div', { className: 'border__cards' });

    try {
      const data = await this.getCards();

      if (data?.length !== 0 && data) {
        data?.forEach((el) => {
          withCards.append(new Cards(el).render());
        });
        image.style.display = 'none';
        borderItem.innerHTML = '';
        borderItem.append(withCards, image, noCards);
        return borderItem;
      }

      if (await this.checkCards()) {
        noCards.textContent = 'No items have been added';
        image.style.display = 'block';
        image.src = doc2;
        borderItem.append(noCards, image);
        return borderItem;
      }
    } catch (error) {}
    image.style.display = 'block';
    image.src = doc;
    borderItem.append(image, noCards);
    return borderItem;
    // return `
    //         <div class="border__item">

    //             <span class="no__cards-item " >
    //                 ${
    //                   'No items have been added'
    //                   // : data.map((el) => {
    //                   //     return new Cards(el).render();
    //                   //   })
    //                 }
    //             </span>
    //             <img class="border__img" src=${
    //               !isTokenInLocalStorage() ? doc : doc2
    //             }>
    //         </div>
    //     `;
  }
}
