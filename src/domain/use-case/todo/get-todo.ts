import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repositories";

export interface GetTodoUseCase {
    execute(dto:number): Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase
{
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    async execute(dto: number): Promise<TodoEntity> {
        return await this.todoRepository.findById(dto);
    }
}