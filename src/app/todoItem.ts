export class TodoItem{
    constructor(
        public id: number,
        public name: string,
        public status: string,
        public dueTo: string,
        public who: string,
        public time: number,
        public moreInfo? : string
    ){}
}