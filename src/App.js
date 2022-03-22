import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { BASE_URL, HEADER } from "./Helper";
import "./App.css";

function App() {
  const [txt, setTxt] = useState("");
  const [email, setEmail] = useState("");
  const [showData, setShowData] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetch(BASE_URL, HEADER("GET"))
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
    fetch(BASE_URL, HEADER("POST", data))
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
