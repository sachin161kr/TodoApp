import React, { useState } from "react";

export default function Register({ title }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser() {
    //console.log("hello");
    //console.log(`${name} ${email} ${password}`);
    const response = await fetch(
      "https://todoserver-sigma.vercel.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "ok") {
      alert("User successfully registered");
      window.location.href = "/";
    } else {
      alert("Duplicate User found");
    }

    console.log(data);
  }

  return (
    <div className="container">
      <h2>{title}</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          //console.log("register");
          if (name && email && password) {
            registerUser();
            //console.log("register");
          } else {
            alert("Enter Valid details");
          }
        }}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Username
          </label>
          <input
            //type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
