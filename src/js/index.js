import '../style.css';
import { Header } from './modules/Header';
import { Border } from './modules/mainBlock/Border.js';
import { isTokenInLocalStorage } from './modules/helper';

const isRenderWithToken = () => {
  const isToken = isTokenInLocalStorage();
  const header = new Header(isToken).render();
  document.querySelector('.header').append(header);
};
isRenderWithToken();

export async function getCardsBeforeBorder() {
  document.querySelector('.border__item').innerHTML = '';
  await new Border().render();
}
getCardsBeforeBorder();
