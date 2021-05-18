import API from './ApiClass.js';
import { Cards } from './ClassCard.js';

const btnFilter = document.getElementById('filter-id');

btnFilter.addEventListener('click', () => {
  const status = getValue('status');
  const urgency = getValue('urgency');
  const search = getValue('search')(async () => {
    const data = await API.getRequest();

    if (data.length === 0 || data.length === undefined) {
      document.querySelector('#no-cards').classList.remove('display-none');
    } else {
      const parent = document.querySelector('#all-cards');
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      data.forEach((visit) => {
        const item = new Cards(
          visit.doctor,
          visit.id,
          visit.status,
          visit.urgency,
          visit.purpose,
          visit.name,
          visit.info,
          visit.pressure,
          visit.index,
          visit.illnesses,
          visit.age,
          visit.lastVisit,
          document.querySelector('#all-cards')
        );
        console.log(item.id);

        if (
          filterSelectStatus(item, status) &&
          filterSelectUrgency(item, urgency) &&
          filterSelectSearch(item, search)
        ) {
          item.render();
        }
      });
    }
  })();
});

function filterSelectStatus(item, status) {
  let filterStatus = false;
  if (status === 'All') {
    filterStatus = true;
  } else if (item.status === status) {
    filterStatus = true;
  }
  return filterStatus;
}

function filterSelectUrgency(item, urgency) {
  let filterUrgency = false;
  if (urgency === 'All') {
    filterUrgency = true;
  } else if (item.urgency === urgency) {
    filterUrgency = true;
  }
  return filterUrgency;
}

function filterSelectSearch(item, search) {
  const values = Object.values(item)
    .filter((item) => typeof item == 'string')
    .map((item) => item.toLowerCase());
  let searchTextChecked = true;
  if (search) {
    searchTextChecked = values.includes(search.toLowerCase());
  }
  return searchTextChecked;
}

function getValue(select) {
  const e = document.getElementById(select);
  return e.value;
}
