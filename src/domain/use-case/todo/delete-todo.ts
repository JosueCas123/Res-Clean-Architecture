import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repositories";

export interface DeleteTodoUseCase {
    execute(id:number): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase
{
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    async execute(id:number): Promise<TodoEntity> {
        return await this.todoRepository.deleteById(id);
    }
}