import { User } from "../models/User";

export class UserForm {
    constructor(public parent: Element, public model: User) {}

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:button': this.onButtonClick,
            'mouseenter:h1': this.onHeaderHover
        };
    }

    onButtonClick(): void {
        console.log('Hi there')
    }

    onHeaderHover(): void {
        console.log('H1 was hovered over');
    }

    template(): string {
        return `
        <div>
            <h1>User Form</h1>
            <div>User Name: ${this.model.get('name')}</div>
            <div>User Age: ${this.model.get('age')}</div>
            <input />
            <button>Click Me</button>
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
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}