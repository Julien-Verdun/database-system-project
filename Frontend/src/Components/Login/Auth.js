import axios from "axios";
import passwordHash from "password-hash";
import { SERVERPATH } from "../../serverParams.js";

export default function isAuthorise(email, password) {
  let isAuth;
  // var hashPassword = passwordHash.generate(password);
  console.log(email, password);
  return new Promise((resolve, reject) => {
    axios
      .get(SERVERPATH + "/login/" + encodeURI(email))
      .then((res) => {
        let hashedPassword = res.data[0].hashpassword;
        isAuth = passwordHash.verify(password, hashedPassword);

        resolve([isAuth, isAuth ? res.data[0].id_cli : null]);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR : ", error);
        reject(error);
      })
      .finally(function () {
        // always executed
      });
  });
}
