

export class UpdateTodoDto {
    private constructor(
        public readonly id?: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values(){
        const returnObj:{[key:string]:any} = {}
        if(this.text) returnObj.text = this.text
        if(this.completedAt) returnObj.completedAt = this.completedAt

        return returnObj
    }

    static create(props:{[key:string]:any}):[string?, UpdateTodoDto?]{
        const {id,text, completedAt} = props;

        let newCompletedA = completedAt

        if(!id || isNaN(Number(id))) return ['Id is required', undefined];
        if(completedAt){
            newCompletedA = new Date(completedAt)
            if(newCompletedA.toString() === 'Invalid Date') return [' CompleteAt MUST be a valid date', undefined]
        }

        return [undefined, new UpdateTodoDto(id,text, newCompletedA)];


    }

}