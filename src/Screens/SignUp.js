import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonComponent from "../Components/ButtonComponent";
import BasicTextFields from "../Components/InputField";
import ControlledRadioButtonsGroup from "../Components/RadioBtn";
import CircularProgress from "@mui/material/CircularProgress";

import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "../Config/FirebaseConfig";

const SignUp = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleSubmition = (e) => {
    e.preventDefault();

    let dataObj = {
      userName,
      email,
      password,
    };

    createUserWithEmailAndPassword(auth, dataObj.email, dataObj.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode);
        // ..
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        setLoading(false);
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div style={{ textAlign: "center" }}>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmition}>
              <BasicTextFields
                onChange={(e) => setUserName(e.target.value)}
                label="Name"
                type="name"
              />
              <ControlledRadioButtonsGroup />
              <BasicTextFields
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                type="email"
              />
              <BasicTextFields
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
              />
              <ButtonComponent
                value="Sign Up"
                variant="outlined"
                color="info"
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default SignUp;
