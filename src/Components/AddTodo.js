import React, { useState } from "react";

export default function AddTodo({ onAdd}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const email = localStorage.getItem("email");

  async function addTodo(event) {
    //console.log("hello");

    const response = await fetch(
      "https://todoserver-sigma.vercel.app/api/addTodo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          title,
          desc,
        }),
      }
    );

    //console.log(response);

    const data = await response.json();
    if (data.status === "ok") {
      alert("Todo Added");
    } else {
      alert("Something went wrong");
    }
    console.log(data);
  }

  return (
    <div className="app-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (title && desc) {
            addTodo();
            onAdd();
          } else {
            alert("Todo Title or Desc cannot be empty");
          }

          setTitle("");
          setDesc("");
          //   console.log(`${title} inserted ${desc}`);
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Add Title
          </label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Add Todo Note
          </label>
          <input
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            value={desc}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <hr />
      <button
        onClick={() => {
          localStorage.setItem("email", "");
          localStorage.setItem("user", false);
          alert("You are logged out");
          window.location.href = "/";
        }}
        type="submit"
        className="btn btn-danger"
      >
        Logout
      </button>
    </div>
  );
}
