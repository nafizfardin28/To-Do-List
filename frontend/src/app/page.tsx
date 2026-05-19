'use client';

import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/todos';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo() {
    if (!newTitle.trim()) return;
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle.trim() }),
    });
    setNewTitle('');
    fetchTodos();
  }

  async function toggleComplete(todo: Todo) {
    await fetch(`${API}/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos();
  }

  async function saveEdit(todo: Todo) {
    if (!editingTitle.trim()) return;
    await fetch(`${API}/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingTitle.trim() }),
    });
    setEditingId(null);
    fetchTodos();
  }

  async function deleteTodo(id: number) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchTodos();
  }

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>

      <div className="input-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.length === 0 && (
          <p className="empty">No tasks yet. Add one above!</p>
        )}

        {todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />

            {editingId === todo.id ? (
              <>
                <input
                  className="edit-input"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo)}
                  autoFocus
                />
                <div className="actions">
                  <button className="btn-save" onClick={() => saveEdit(todo)}>Save</button>
                  <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span className={`title ${todo.completed ? 'done' : ''}`}>
                  {todo.title}
                </span>
                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => { setEditingId(todo.id); setEditingTitle(todo.title); }}
                  >Edit</button>
                  <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}