import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repositories";

export interface GetTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase
{
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    async execute(): Promise<TodoEntity[]> {
        return await this.todoRepository.getAll();
    }
}