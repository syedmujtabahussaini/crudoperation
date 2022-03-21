import React, { useState } from "react";
import swal from "sweetalert";
import "./App.css";

function App() {
  const [txt, setTxt] = useState("");

  const changeTxt = () => {
    let data = {
      data: {
        std_name: txt,
        std_email: "",
      },
    };
    fetch("https://limitless-brushlands-46213.herokuapp.com/api/students", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.status === 200) {
          swal("Good job!", "Record has been saved", "success");
        }
        console.log(data.status);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label>
            Enter your name:
            <input
              type="text"
              value={txt}
              onChange={(e) => {
                setTxt(e.target.value);
              }}
            />
          </label>
          <br />
        </form>
        <button onClick={changeTxt}>Add Data</button>
      </header>
    </div>
  );
}

export default App;
