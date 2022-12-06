import React from "react";

import "../App.css";

export default function Header(props) {
  return (
    <div className="App-header">
      <h2>Welcome to {props.title}</h2>
    </div>
  );
}
