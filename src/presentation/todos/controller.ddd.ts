import { Request, Response } from "express";
import { prisma } from "../../data";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from '../../domain/dtos/todos/update.todo.dto';
import { TodoRepository } from "../../domain";

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

    public getTodos = async(req:Request, res:Response) => {

        //const todo =  await prisma.todo.findMany();
        const todo =  await  this.todoRepository.getAll();

        res.json(todo);
    };

    public getTodoById = async (req:Request, res:Response) => {
        const id = +req.params.id;
        // if(isNaN(id)) return res.status(400).json({error:'Id is required'});
        // const todo =  await prisma.todo.findFirst({where: { id }});
        // if(!todo) return res.status(404).json({error:`Todo not found ${id}`});
        
        // (todo)
        // ? res.json(todo)
        // : res.status(404).json({error:`Todo not found ${id}`});
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
            
        } catch (error) {
            res.status(400).json({error});
        }
      
    };

    public crateTodo = async(req:Request, res:Response) => {
        // const {text} = req.body;
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        
        if(error) return res.status(400).json({error});

       const todo = await this.todoRepository.create(createTodoDto!);
               
        // const newTodo = {
        //     id:todos.length + 1,
        //     text:text,
        //     createdAdd:null
        // }

       // todos.push(newTodo);

        res.json(todo)
    };

    public updateTodo = async(req:Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if(error) return res.status(400).json({error});
        
        const todo =  await prisma.todo.findFirst({where: { id }});

        if(!todo) return res.status(404).json({error:`Todo not found ${id}`});
     

        const updateTodo =  await prisma.todo.update({
            where:{
                id
            },
            data: updateTodoDto!.values
        });


        res.json(updateTodo);

    };

    public deleteTodo = async(req:Request, res:Response) => {
        const id = +req.params.id;
        try {
            
            const deleteTodo =  await this.todoRepository.deleteById(id);
            res.json(deleteTodo);
        } catch (error) {
            res.status(400).json({error});
        }
    };
}