import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository{

    constructor(
        private readonly tadasource : TodoDataSource
    ) {}

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
         return this.tadasource.create(createTodoDto);
    }
    async getAll(): Promise<TodoEntity[]> {
        return this.tadasource.getAll();
    }
    async findById(id: number): Promise<TodoEntity> {
        return this.tadasource.findById(id);
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.tadasource.updateById(updateTodoDto);
    }
    async deleteById(id: number): Promise<TodoEntity> {
       return this.tadasource.deleteById(id);
    }
}