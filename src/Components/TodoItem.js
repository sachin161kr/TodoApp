import React from "react";

export default function TodoItem({ todoItem, onDelete}) {
  
  const title = todoItem.title;
  const email = localStorage.getItem("email");

  async function deleteTodo() {
    //console.log("hello");
  
    const response = await fetch(
      "https://todoserver-sigma.vercel.app/api/deleteTodo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          title
        }),
      }
    );
  
    //console.log(response);
  
    const data = await response.json();
    if (data.status === "ok") {
      alert("Todo Deleted");
      onDelete();
    } else {
      alert("Something went wrong");
    }
    //console.log(data);
  }
  
  
  return (
    <div className="container">
      <h3>{todoItem.title}</h3>
      <p>{todoItem.desc}</p>
      <button
        className="btn btn-danger"
        onClick={() => {
          deleteTodo();
          onDelete();
          //console.log(email,title);
        }}
      >
        Delete
      </button>
    </div>
  );
}
