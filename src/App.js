import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import "./App.css";

function App() {
  const [txt, setTxt] = useState("");
  const [email, setEmail] = useState("");
  const [showData, setShowData] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetch("https://limitless-brushlands-46213.herokuapp.com/api/students", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer a1abbcd3415a46cb1eec14ea46f4b1d6ab200c5284fcf23054ec9cec7e87ad4cd1fd413c4cc45fe8053ee05c7c1ce8caca716eb0b498d07b9959952c5dce33b7fe1a263bb96acc7b7d05bf18e946d8a8d81fbb00e48c34c53fcaac37a4a15c07b9965b0551c79b3dc0cc525692ef2232fd684d64e2c6554a8e58269537c1b5f4",
      },
    })
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, [flag]);

  const changeTxt = () => {
    let data = {
      data: {
        std_name: txt,
        std_email: email,
      },
    };
    fetch("https://limitless-brushlands-46213.herokuapp.com/api/students", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer a1abbcd3415a46cb1eec14ea46f4b1d6ab200c5284fcf23054ec9cec7e87ad4cd1fd413c4cc45fe8053ee05c7c1ce8caca716eb0b498d07b9959952c5dce33b7fe1a263bb96acc7b7d05bf18e946d8a8d81fbb00e48c34c53fcaac37a4a15c07b9965b0551c79b3dc0cc525692ef2232fd684d64e2c6554a8e58269537c1b5f4",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.status === 200) {
          swal("Good job!", "Record has been saved", "success");
        }

        if (data.status === 401) {
          swal("Unauthorize", "User is not Authorize", "error");
        }
      })
      .catch((error) => {
        console.log("Error Msg====>", error);
      });
    setFlag(!flag);
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
              autoFocus
              required
              onChange={(e) => {
                setTxt(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Enter your Email:
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <br />
          <br />
        </form>
        <button onClick={changeTxt}>Add Data</button>
        <div>
          {showData.data
            ? showData.data.map((item) => (
                <p>{`[Name: ${item.attributes.std_name}] [Email: ${item.attributes.std_email}] `}</p>
              ))
            : null}
        </div>
      </header>
    </div>
  );
}
export default App;
