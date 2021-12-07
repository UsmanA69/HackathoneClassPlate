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
    database,
    ref,
    set,
} from "../Config/FirebaseConfig";
import { Button, Link } from "@mui/material";

const SignUp = () => {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [pNumber, setPNumber] = useState();
    const [cnic, setCnic] = useState();
    const [country, setCountry] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleSubmition = (e) => {
        e.preventDefault();

        let dataObj = {
            userName,
            pNumber,
            cnic,
            country,
            email,
            password,
        };

        createUserWithEmailAndPassword(auth, dataObj.email, dataObj.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const userUid = userCredential.user.uid;

                set(ref(database, "users/" + userUid), dataObj);
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
                    <div style={{ background: '#1a1b3a' }}>
                        <div className="paper" style={{ textAlign: "center", background: '#1a1b3a' }}>

                            <h1>Sign Up</h1>
                            <form onSubmit={(e) => handleSubmition(e)}>

                                <div style={{ marginLeft: '15%', marginRight: '15%' }}>
                                    <h5 style={{ textAlign: "left" }}>UserName</h5>
                                    <div className="password-inp-div">
                                        <input className="password-inp" placeholder="userName" type="name" onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                </div>
                                <div style={{ marginLeft: '15%', marginRight: '15%' }}>
                                    <h5 style={{ textAlign: "left" }}>Phone Number</h5>
                                    <div className="password-inp-div">
                                        <input className="password-inp" placeholder="Phone Number" type="number" onChange={(e) => setPNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div style={{ marginLeft: '15%', marginRight: '15%' }}>
                                    <h5 style={{ textAlign: "left" }}>CNIC</h5>
                                    <div className="password-inp-div">
                                        <input className="password-inp" placeholder="CNIC" type="number" onChange={(e) => setCnic(e.target.value)} />
                                    </div>
                                </div>
                                <div style={{ marginLeft: '15%', marginRight: '15%' }}>
                                    <h5 style={{ textAlign: "left" }}>Country</h5>
                                    <div className="password-inp-div">
                                        <input className="password-inp" placeholder="Country" type="text" onChange={(e) => setCountry(e.target.value)} />
                                    </div>
                                </div>
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
                                <Button type='submit' sx={{ background: '#343436', margin: '10px' }} variant="contained">
                                    SignUp
                                </Button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SignUp;


// COuntrt
// Cnic
// PhoneNum