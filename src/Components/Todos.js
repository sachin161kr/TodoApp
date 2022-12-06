import React from "react";
import TodoItem from "./TodoItem";

export default function Todos({ todos, onDelete }) {
  return (
    <div className="flex-container">
      {todos.map((todo) => {
        return (
          <>
            <div>
              <TodoItem todoItem={todo} onDelete={onDelete} />
            </div>
          </>
        );
      })}
    </div>
  );
}
