

export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date|null,
    ) {}
        
    get isCompleted() {
        return !!this.completedAt
    }
    public static fromObj(object:{[key:string]:any}) {
        const {id, text, completedAt} = object
        if(!id) throw 'Id is required'
        if(!text) throw 'Text is required'

        let newCompletedAt;
        if(completedAt) {
            newCompletedAt = new Date(completedAt)
            if(isNaN(newCompletedAt.getTime())) throw 'Invalid date'
        }

        return new TodoEntity(id, text, newCompletedAt)
    }
}