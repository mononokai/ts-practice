import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

// the question mark allows the property to be optional
export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}
const rootUrl = 'http://localhost:3000/users';

export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
}