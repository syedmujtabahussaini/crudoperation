import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import "./App.css";

function App() {
  const [txt, setTxt] = useState("");
  const [email, setEmail] = useState("");
  const [showData, setShowData] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetch("http://localhost:1337/api/students", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 39cbf369406a465905a061e8cab0c17e27e67a377e3251534f9e9ae5f2edc2149cdb5cd06ca9e05194877422ff629ac6651e5fb79d52ac6300572b1145ca5f7caf605b01eaf394d3fbc10f3068303012defb4e90b4480db1e61072a277cc00ef838163fa620dabf17e9a89bf781bc9287dd38e010bf55d7f66ad73ca533a81e4",
      },
    })
      .then((response) => response.json())
      .then((data) => setShowData(data));
  }, []);

  console.log(showData);
  const changeTxt = () => {
    let data = {
      data: {
        std_name: txt,
        std_email: email,
      },
    };
    fetch("http://localhost:1337/api/students", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 39cbf369406a465905a061e8cab0c17e27e67a377e3251534f9e9ae5f2edc2149cdb5cd06ca9e05194877422ff629ac6651e5fb79d52ac6300572b1145ca5f7caf605b01eaf394d3fbc10f3068303012defb4e90b4480db1e61072a277cc00ef838163fa620dabf17e9a89bf781bc9287dd38e010bf55d7f66ad73ca533a81e4",
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
