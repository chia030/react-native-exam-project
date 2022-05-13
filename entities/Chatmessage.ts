import { User } from "./User";

export class Chatmessage {
    constructor(public title: string, public user: User, public id?: string) { }
}