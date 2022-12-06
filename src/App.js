import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Todos from "./Components/Todos";
import React, { useEffect, useState } from "react";
import AddTodo from "./Components/AddTodo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {

  const email = localStorage.getItem("email");
  // useEffect(()=>{
  //    console.log("hello");
  // },[loggedIn])
  //const [todos, setTodos] = useState([]);
  //let todos = [];
  
  const [todos,setTodos] = useState([]);
  const [toggle,setToggle] = useState(true);
  async function getTodoData()
  { 
    let tempArray = [];
    const response = await fetch(
      `https://todoserver-sigma.vercel.app/api/getTodos/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //console.log(response.body);
    const data = await response.json();
    console.log(data);

    data.map((e)=>{
        const temp = {
          title : e.title,
          desc : e.desc
        }

        tempArray.push(temp);

        //setTodos([...todos, temp]);
    })

    setTodos(tempArray);


  }

  // const updateArr = ()=>{
  //   tempArray.map((e)=>{
  //     const temp = {
  //       title : e.title,
  //       desc : e.desc
  //     }

  //     setTodos([...todos, temp]);

  //   })
  // }

  useEffect(()=>{
    getTodoData();
  },[email,toggle])

  




  //console.log(`Logged In user = ${loggedIn}`);
  

  const onDelete = () => {
    getTodoData();
    setToggle(!toggle);
  };

  const onAdd = () => {
     getTodoData();
     setToggle(!toggle);
  };

  //console.log(mytodo);

  //setTodos([...todos, mytodo]);

  // async function onAdd(email) {
  //   console.log("hello");

    // try {
    //   const response = await fetch(
    //     `https://todoserver-sigma.vercel.app/api/getTodos/${email}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log(response.body);
    //   //const data = response.body;
    //   // if (data.status === "ok") {
    //   //   alert("Login Successful");
    //   //   window.location.href = "/app";
    //   //   localStorage.setItem("email", email);
    //   //   localStorage.setItem("user", true);
    //   // } else {
    //   //   alert("Wrong email or password");
    //   // }
    // } catch (error) {
    //   console.log(error);
    // }

    //setTodos(...todos, response);

    // console.log(data);
  //}

  return (
    <>
      <Router>
        <Header title="My Todos List" />
        <Routes>
          <Route
            path="/app"
            element={
              <>
                <>
                  <AddTodo className="addtodo" onAdd={onAdd}/>
                  {todos.length === 0 ? (
                    <h2 className="app-title">No todos found! ...</h2>
                  ) : (
                    <h2 className="app-title">Pending Todos ...</h2>
                  )}
                  <Todos todos={todos} onDelete={onDelete}/>;
                </>
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <Login title={"Login Page"} onAdd={onAdd}></Login>
              </>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <>
                <Register title={"Register User"}></Register>
              </>
            }
          ></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
