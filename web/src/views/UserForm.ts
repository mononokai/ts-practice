import { User } from "../models/User";

export class UserForm {
    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick
        };
    }

    onSetAgeClick = ():void => {
        this.model.setRandomAge();
    }

    onSetNameClick = ():void => {
        const input = this.parent.querySelector('input');
        
        // this type guard keeps us from getting null as a possible value
        if (input) {
            const name = input.value;
            
            this.model.set({ name });
        }
    }

    template(): string {
        return `
        <div>
            <h1>User Form</h1>
            <div>User Name: ${this.model.get('name')}</div>
            <div>User Age: ${this.model.get('age')}</div>
            <input />
            <button class='set-name'>Change Name</button> <br><br>
            <button class='set-age'>Set Random Age</button>
        <div>
        `;
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventsKey in eventsMap) {
            const [eventName, selector] = eventsKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventsKey]);
            });
        }
    }
    
    render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}