/***
TODO: Необходимо, чтобы открывалось модальное окно по клику на ссылку "Открыть окно".
      Данные из формы по кнопке "Сохранить" собирались из инпутов и сохранялись в LocalStorage.
      При открытии модального окна снова, форма (инпуты) должна быть чистой.
      Кнопки "Отмена" и "крестик" должны просто закрывать модальное окно.

      *Лучше когда кнопка "Сохранить" будет задизейблена пока не введены
      все значения инпутов.

!!!решение задачи в лоб, быстро!
***/
class Model {

}

class View {
    constructor(id) {
        this.template = document.querySelector('#' + id)
    }
}

//отвечает за model & view
class Controller {
    constructor(model, view, event) {
        this.model = model;
        this.view = view;
        this.event = event;
        this.addEvents()
    }
    addEvents() {
        if (this.event) {
            if (this.event.type === 'change') {
                this.view.template.addEventListener(this.event.type, (event) => {
                    this.model.value = event.target.value
                })
            } else if (this.event.type === 'click') {
                this.view.template.addEventListener(this.event.type, this.event.callback)
            }
        }
    }
}

//внутри себя будет создавать в конструкторе по факту какую-то MVC(какой-то instas)
class Component {
    constructor(id, event) {
        this.model = new Model();//здесь хранится instant модели
        this.view = new View(id);
        this.controller = new Controller(this.model, this.view, event)
    }
}

class ModalWindow extends Component {
    constructor(id) {
        super(id)
    }
    open() {
        this.view.template.classList.remove('modal_closed')
    }
    close() {
        this.view.template.classList.add('modal_closed')
    }
    sendData(name,birthDay, birthMonth, birthYear) {
        localStorage.setItem("userData", JSON.stringify({ name, birthDay, birthMonth, birthYear }));
    }

}
class ModalOverlay extends Component {
    constructor(id) {
        super(id)
    }
    open() {
        this.view.template.classList.remove('modal_closed')
    }
    close() {
        this.view.template.classList.add('modal_closed')
    }

}
class Button extends Component {
    constructor(id, event) {
        super(id, event)
    }
}

class Input extends Component {
    constructor(id) {
        super(id, { type: 'change' })
    }

    // метод запрашивающий из модели значение
    getValue() {
        return this.model.value
    }
    clear() {
        this.model.value = '';
        this.view.template.value = '';

    }
}

const modalWindow = new ModalWindow('modal');
const modalOverlay = new ModalOverlay('modal-overlay');//серый фон
const btnOpen = new Button('modal-open', {
    type: 'click', callback: () => {
        modalWindow.open();
        modalOverlay.open()
    }
});
const btnClose = new Button('modal-close', {
    type: 'click', callback: () => {
        modalWindow.close();
        modalOverlay.close();
        inputName.clear();
        inputData.clear();
        inputMounth.clear();
        inputYear.clear();
    }
})
const inputName = new Input('name');
const inputData = new Input('birth-day');
const inputMounth = new Input('birth-month');
const inputYear = new Input('birth-year');
const btnSave = new Button('modal-save', {
    type: 'click', callback: () => {
        modalWindow.close();
        modalOverlay.close();
        modalWindow.sendData(inputName.getValue(), inputData.getValue(), inputMounth.getValue(), inputYear.getValue());
        inputName.clear();
        inputData.clear();
        inputMounth.clear();
        inputYear.clear();
    }
});
const btnCancel = new Button('modal-cancel', {
    type: 'click', callback: () => {
        modalWindow.close();
        modalOverlay.close();
        inputName.clear();
        inputData.clear();
        inputMounth.clear();
        inputYear.clear();
    }
});
