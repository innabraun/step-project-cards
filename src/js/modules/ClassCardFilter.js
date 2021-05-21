
import API from './ApiClass.js';
import { Cards } from './ClassCard.js';





export class Filter {
    onClickFilter() {
        const btnFilter = document.getElementById('filter-id');

        btnFilter.addEventListener('click', async () => {
            // const status = this.getValue('status')
            const urgency = this.getValue('urgency')
            const search = this.getValue('search')
            if (search){console.log('!!!!')}
            console.log(urgency, search);

            const data = await API.getRequest()

            const parent = document.querySelector('.border__cards');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            data.forEach(visit => {
                let item = new Cards(visit);

                if(this.filterSelectUrgency(item, urgency) && this.filterSelectSearch(item, search)){
                    parent.append(item.render());
                }
            })




        })
    }


    filterSelectStatus(item, status){
        let filterStatus = false
        if(status === 'All'){
            filterStatus = true;
        }else if(item.status === status){
            filterStatus = true;
        }
        return filterStatus
    }

    filterSelectUrgency(item, urgency){
        let filterUrgency = false
        if(urgency === 'All'){
            filterUrgency = true;
        }else if(item.urgency === urgency){
            filterUrgency = true;
        }
        return filterUrgency
    }

    filterSelectSearch(item, search){
        const values = Object.values(item).filter(item => typeof item == 'string').map(item => item.toLowerCase());
        let searchTextChecked = true;
        if(search){
            searchTextChecked = values.includes(search.toLowerCase())
        }
        return searchTextChecked
    }


    getValue(select){
        const e = document.getElementById(select);
        return e.value;
    }

}
