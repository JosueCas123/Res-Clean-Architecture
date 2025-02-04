import { Request, Response } from "express";
import { prisma } from "../../data";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from '../../domain/dtos/todos/update.todo.dto';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

// const todos = [
//     {id:1, text:'Todo 1'},
//     {id:2, text:'Todo 2'},
//     {id:3, text:'Todo 3'},
//     {id:4, text:'Todo 4'},
//     {id:5, text:'Todo 5'},
// ]

export class TodosController  {

    //* Inyeccion de dependencias
    constructor(
         private readonly todoRepository: TodoRepository
    ) {}

    public getTodos = (req:Request, res:Response) => {

        //const todo =  await prisma.todo.findMany();
        
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({error}));
    };

    public getTodoById =  (req:Request, res:Response) => {
        const id = +req.params.id;
        // if(isNaN(id)) return res.status(400).json({error:'Id is required'});
        // const todo =  await prisma.todo.findFirst({where: { id }});
        // if(!todo) return res.status(404).json({error:`Todo not found ${id}`});
        
        // (todo)
        // ? res.json(todo)
        // : res.status(404).json({error:`Todo not found ${id}`});
        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({error}));
      
    };

    public crateTodo = (req:Request, res:Response) => {
        // const {text} = req.body;
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        
        if(error) return res.status(400).json({error});

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}));
               
        // const newTodo = {
        //     id:todos.length + 1,
        //     text:text,
        //     createdAdd:null
        // }

       // todos.push(newTodo);

    };

    public updateTodo = (req:Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}));

    };

    public deleteTodo = (req:Request, res:Response) => {
        const id = +req.params.id;
        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}));
    };
}