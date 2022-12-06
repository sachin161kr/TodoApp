import React, { useState } from "react";

export default function Login({ title, onAdd }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    //console.log("hello");

    const response = await fetch(
      "https://todoserver-sigma.vercel.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    console.log(response);

    const data = await response.json();
    if (data.status === "ok") {
      localStorage.setItem("email", email);
      localStorage.setItem("user", true);
      alert("Login Successful");
      //onAdd(email);
      window.location.href = "/app";
    } else {
      alert("Wrong email or password");
    }
    console.log(data);
  }

  return (
    <div className="container">
      <h2>{title}</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (email && password) {
            loginUser();
          } else {
            alert("Invalid email or password");
          }
          //console.log("Login");
          //alert(`${email} and ${password}`);
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <hr />
      </form>
      <button
        onClick={() => {
          window.location.href = "/register";
        }}
        type="submit"
        className="btn btn-danger"
      >
        Register
      </button>
    </div>
  );
}
