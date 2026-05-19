import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.todosService.create(title);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('completed') completed: boolean,
  ) {
    return this.todosService.update(Number(id), title, completed);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosService.delete(Number(id));
  }
}