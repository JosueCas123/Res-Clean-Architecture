import { prisma } from "../../data";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDataSourceImpl implements TodoDataSource{ 
    async create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo =  await prisma.todo.create({
            data: CreateTodoDto!
        });

        return TodoEntity.fromObj(todo)
    }
    async getAll(): Promise<TodoEntity[]> {
        const todo = await prisma.todo.findMany()
        return todo.map(todo => TodoEntity.fromObj(todo))
    }
    async findById(id: number | undefined): Promise<TodoEntity> {
        const todo =  await prisma.todo.findFirst({where: { id }});
        if(!todo) throw `Todo not found ${id}`;
        return TodoEntity.fromObj(todo)
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id);
        const updateTodo =  await prisma.todo.update({
            where:{
                id:updateTodoDto.id
            },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObj(updateTodo)
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleteTodo =  await prisma.todo.delete({
            where:{
                id
            }
        });

        return TodoEntity.fromObj(deleteTodo)
    }

}