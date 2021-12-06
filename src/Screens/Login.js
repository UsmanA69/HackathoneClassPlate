import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonComponent from "../Components/ButtonComponent";
import { Link } from "react-router-dom";
import BasicTextFields from "../Components/InputField";
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "../Config/FirebaseConfig";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleSubmition = (e) => {
    e.preventDefault();

    let dataObj = {
      email,
      password,
    };

    signInWithEmailAndPassword(auth, dataObj.email, dataObj.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={handleSubmition}>
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
            <ButtonComponent value="Login" variant="outlined" color="info" />
          </form>
          <Link to="/signup">
            <ButtonComponent
              value="Dont have an account ? Sign Up"
              variant="text"
              color="info"
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default Login;
