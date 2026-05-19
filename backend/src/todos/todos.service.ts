import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos: Array<{ id: number; title: string; completed: boolean }> = [];

  findAll() {
    return this.todos;
  }

  create(title: string) {
    const todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    this.todos.push(todo);
    return todo;
  }

  update(id: number, title: string, completed: boolean) {
    const todo = this.todos.find((t) => t.id === id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.title = title ?? todo.title;
    todo.completed = completed ?? todo.completed;

    return todo;
  }

  delete(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    return { message: 'Todo deleted successfully' };
  }
}