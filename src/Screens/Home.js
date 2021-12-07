import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../Config/FirebaseConfig";
import { useLocation, useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation()
  console.log(location.state);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoggedIn(true);
        setLoading(false);
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h1>Home</h1>
          <Box>
            {loggedIn ? null : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" sx={{ margin: "5px" }}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" sx={{ margin: "5px" }}>
                    SignUp
                  </Button>
                </Link>
              </>
            )}
            <Button
              onClick={() => signOut(auth)}
              variant="outlined"
              sx={{ margin: "5px" }}
            >
              Log Out <LogoutIcon />
            </Button>
            
          <div style={{background:'gray',margin:'100px'}}>
            <h3>{location.state.userName}</h3>
            <h3>{location.state.cnic}</h3>
            <h3>{location.state.country}</h3>
            <h3>{location.state.email}</h3>
            <h3>{location.state.pNumber}</h3>

          </div>
          </Box>
        </>
      )}
    </div>
  );
};

export default Home;
