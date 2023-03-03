import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider ,googleLogout } from '@react-oauth/google';
import { Typography, Paper, Button, Avatar, Grid, Conatiner, Container, TextField, CircularProgress } from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import useStyles from "./styles";
import {clientId} from "./data";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from "./input"
import {useDispatch, useSelector} from "react-redux";
import {signup,signin, googleAuth} from "../../actions/auth"
// import { addUser } from "../../actions/users";
// import { sendOTP } from "./functions";
// import axios from "axios";
const user=JSON.parse(localStorage.getItem('profile'));
const initialState={firstName:"",lastName:"",email:"",password:"",picture:user?.result?.picture,confirmPassword:""};
const Auth = () => {
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const classes = useStyles();
    const navigate=useNavigate();
    const {message,isLoading}=useSelector(state=>state.auth)
    // const isSignup = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        // validGmailId(formData.email);
        if(isSignup){
            const OTP=Math.round(Math.random()*1000);
            // sendOTP(OTP,formData.email);
             dispatch(signup(formData,navigate));
        }else{
            dispatch(signin(formData,navigate));
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
     }
    const googleSuccess = async (res) => {
        // console.log(res); 
        try {
             const result= await jwt_decode(res.credential);
             const token=res.credential;
            //  console.log("token => ",token)
             dispatch(googleAuth({result,token},navigate));
            //  navigate("/")
        } catch (error) {
            
            console.log(error);
        }
    }
    const googleFailure = (err) => {
        console.log(err, "Google Sign In was unsuccessfull. Try again later ")
    }
    const swicthMode = () => {
        setIsSignUp(prev => !prev);
        setShowPassword(false);
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    return (
        <>
            <Container component='main' maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Typography variant="body2" className={classes.error}>{message}</Typography>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" value={formData.firstName} handleChange={handleChange} half />
                                        <Input name="lastName" label="Last Name" value={formData.lastName} handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" value={formData.email} handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" vaule={formData.password} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Confirm Password" value={formData.confirmPassword} handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" color="primary" variant="contained" fullWidth className={classes.submit}>
                           {isLoading ? <CircularProgress />: <>{isSignup ? 'Sign Up' : 'Sign In'}</>}
                        </Button>
                        <Button   variant="contained" fullWidth className={classes.googleButton}>
                        <GoogleOAuthProvider clientId={clientId}>
                            <GoogleLogin
                                onSuccess={googleSuccess}
                                onError={googleFailure}
                                theme="outlined"
                            />
                        </GoogleOAuthProvider>
                        </Button>


                        <Grid container justifyContent="flex-end" >
                            <Grid item >
                                <Button onClick={swicthMode}>
                                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Auth




// {error: 'idpiframe_initialization_failed', details: 'You have created a new client application that use…i/web/guides/gis-migration) for more information.'}

// https://api.kickbox.com/v2/verify?email=bill.lumbergh@gamil.com&apikey={{YOUR_API_KEY}}