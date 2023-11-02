import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);

    return await this.todoRepository.save(todo);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if(!todo){
      console.log('no todo found')
      return null;
    }
    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
    
  }

  async remove(id: number) {
const todo= await this.todoRepository.findOne({where:{id}});
if(!todo) {
  console.log('no todo found')
  return `no todo found with id ${id}`;
}    
return await this.todoRepository.remove(todo);
  }

  async removeAll() {
    return await this.todoRepository.clear();
  }
}
