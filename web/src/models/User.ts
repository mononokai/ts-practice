import axios, { AxiosResponse } from "axios";

// the question mark allows the property to be optional
interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

export class User {
    events: { [key: string]: Callback[] } = {};

    constructor(private data: UserProps) {}

    get(propName: string): (string | number) {
        return this.data[propName];
    }

    set(update: { UserProps }): void {
        Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback): void {
         // can be Callback[] or undefined 
        const handlers = this.events[eventName]  || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(callback => {
            callback();
        })
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            })
    }

    save(): void {
        const id = this.get('id');

        if (id) {
            axios.put(`http://localhost:3000/users/${id}`, this.data);
        }
        else {
            // post
            axios.post(`http://localhost:3000/users`, this.data);
        }
    }
}