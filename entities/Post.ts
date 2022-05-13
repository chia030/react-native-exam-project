export class Post {
    constructor(public title: string, public author: string,
        public content: string, public timestamp: Date, public id?: string,) { }
}