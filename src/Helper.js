const TOKEN =
  "a1abbcd3415a46cb1eec14ea46f4b1d6ab200c5284fcf23054ec9cec7e87ad4cd1fd413c4cc45fe8053ee05c7c1ce8caca716eb0b498d07b9959952c5dce33b7fe1a263bb96acc7b7d05bf18e946d8a8d81fbb00e48c34c53fcaac37a4a15c07b9965b0551c79b3dc0cc525692ef2232fd684d64e2c6554a8e58269537c1b5f4";

export const BASE_URL =
  "https://limitless-brushlands-46213.herokuapp.com/api/students";

export function HEADER(meth, data) {
  return {
    method: meth,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    },
    body: JSON.stringify(data),
  };
}
