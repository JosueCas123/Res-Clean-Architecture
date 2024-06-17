import { Request, Response } from "express";

const todos = [
    {id:1, name:'Todo 1'},
    {id:2, name:'Todo 2'},
    {id:3, name:'Todo 3'},
    {id:4, name:'Todo 4'},
    {id:5, name:'Todo 5'},
]

export class TodosController  {

    //* Inyeccion de dependencias
    constructor() {}

    public getTodos = (req:Request, res:Response) => {

        res.json(todos);
    };

    public getTodoById = (req:Request, res:Response) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        
        (todo)
        ? res.json(todo)
        : res.status(404).json({error:`Todo not found ${id}`});
    };
}