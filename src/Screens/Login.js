import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonComponent from "../Components/ButtonComponent";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import BasicTextFields from "../Components/InputField";
import LockIcon from '@mui/icons-material/Lock';
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  database,
  ref,
  onChildAdded,onValue
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
        const userUid = userCredential.user.uid;


        onValue(ref(database, "users/" + userUid), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          // updateStarCount(postElement, data);


          navigate('/',{state:data})
        });
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
    <div style={{background:'#1a1b3a'}}>
      <div className="paper" style={{ textAlign: "center", background: '#1a1b3a' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={(e)=>handleSubmition(e)}>
           
            <div style={{ marginLeft: '15%', marginRight: '15%' }}>
              <h5 style={{ textAlign: "left" }}>Email</h5>
              <div className="password-inp-div">
                <input className="password-inp" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div style={{ marginLeft: '15%', marginRight: '15%' }}>
              <h5 style={{ textAlign: "left" }}>Password</h5>
              <div className="password-inp-div">
                <input className="password-inp" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button type='submit'  sx={{background:'#343436',margin:'10px'}} variant="contained">
              Login
            </Button>
          </form>
          <Link to="/signup">
            <Button sx={{marginTop:'10%'}} variant="text">
            Dont have an account ? Sign Up
            </Button>
           
          </Link>

        </>
      )}
    </div>
    </div>
  );
};

export default Login;
