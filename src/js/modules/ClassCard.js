import API from "../ApiClass";

export class Cards {
    constructor(doctor, id, status, urgency, purpose, name, info, pressure, index, illnesses, age, lastVisit, parentElement) {
        this.doctor = doctor;
        this.id = id;
        this.purpose = purpose;
        this.name = name;
        this.info = info;

        this.status = status;
        this.urgency = urgency;
        this.pressure = pressure;
        this.index = index;
        this.illnesses = illnesses;
        this.age = age;
        this.lastVisit = lastVisit;

        this.elements = {
            parent: parentElement,
            container: document.createElement('div'),
            doctor: document.createElement('p'),
            status: document.createElement('p'),
            urgency: document.createElement('p'),
            purpose: document.createElement('p'),
            name: document.createElement('p'),
            info: document.createElement('p'),
            btn: document.createElement('button'),
            addInfo: document.createElement('div')
        }
    }

    addAllCards = async () => {
        const data = await API.getAllCards()
        console.log(data)

        if (data.length === 0 || data.length === undefined) {
            document.querySelector('#no-cards').classList.remove('display-none')
        }else {
            data.forEach(visit => {
                let item = new Cards(visit.doctor, visit.id, visit.status, visit.urgency, visit.purpose, visit.name, visit.info, visit.pressure, visit.index, visit.illnesses, visit.age, visit.lastVisit, document.querySelector('#all-cards'));
                console.log(typeof item)
                item.render();
            })
        }

    };

    handleClick() {
        if (this.doctor === 'Кардиолог'){
            this.addInfoCardio()
        }else if (this.doctor === 'Терапевт'){
            this.addInfoCardio()
        }else if (this.doctor === 'Стоматолог'){
            this.addInfoCardio()
        }
    }

    addInfoCardio() {
        const {btn, addInfo, container} = this.elements;
        btn.remove()
        console.log(this)
        const pressure = document.createElement('p')
        const index = document.createElement('p')
        const illnesses = document.createElement('p')
        const age = document.createElement('p')
        const lastVisit = document.createElement('p')

        const btnEdit = document.createElement('button')
        const btnDelete = document.createElement('button')
        btnEdit.textContent = 'Редактировать'
        btnDelete.textContent = 'Удалить'
        pressure.textContent = this.pressure;
        index.textContent = this.index;
        illnesses.textContent = this.illnesses;
        age.textContent = this.age;
        lastVisit.textContent = this.lastVisit;
        addInfo.append(pressure, index, illnesses, age, lastVisit, btnEdit, btnDelete);
        container.append(addInfo);
        btnDelete.addEventListener('click', ()=> this.btnDelete());
        // btnEdit.addEventListener('click', ()=> this.btnDelete());
    }


    async btnDelete(){
        const id = this.id;
        try {
            // await Fetch.deleteCard(id);
            document.querySelector(`[data-id='${id}']`).remove()
        } catch(err) {
            alert(err);
        }
    }


    render() {
        const {parent, status, urgency, container, doctor, purpose, name, info, btn} = this.elements;
        status.textContent = this.status;
        doctor.textContent = this.doctor;
        urgency.textContent = this.urgency;
        purpose.textContent = this.purpose;
        name.textContent = this.name;
        info.textContent = this.info;
        btn.textContent = 'Показать больше';
        container.setAttribute('data-id', `${this.id}`);

        btn.addEventListener('click', ()=> this.handleClick());
        container.classList.add('card-container');

        container.append(doctor, status, urgency, purpose, name, info, btn);

        parent.append(container);
    }
}