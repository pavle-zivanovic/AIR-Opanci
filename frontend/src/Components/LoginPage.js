import React from 'react';
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import '../Styles/Login.css';



function LoginPage(){

    const [passWord , setPassWord] = useState('')
    const [passError , setPassError] = useState(false)
    const [email , setEmail] = useState('')
    const [emailError , setEmailError] = useState(false)

    const navigate = useNavigate();

    const emailCheck = () => {
        // fetch email 
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(email)){
            return true 
        }
        else {
            setEmailError(true);
            return false
        }
    }


async function Login(){

    const user = {
        password: passWord,
        email: email,
   }
   try{
    let result = await fetch("User/Login/", {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
        },
        body : JSON.stringify(user)
      });
      let a = await result.json();

      if (a === 1){
        navigate("/")
    
      }
   }
   catch (error)
   {
      //console.log(error)
   }
}

const handleLogin = ()=> {
    setEmailError(false);setPassError(false);


    if (email === ''){
        setEmailError(true)
    }
    if (passWord === ''){
        setPassError(true)
    }

    if(passError){

        alert("Nisu popunjena sva potrebna polja")
    }
    // ako je sve ok pravi se nalog i prebacuje nas na main 
    if(!emailCheck()){
        alert("Nevalidan email")
    }
    if (passWord && emailError && emailCheck()){
        
        Login()
    }
}

    return(
        <div class="LoginForm">
            <form>      
                <div class="divLogin">
                    <input class="emailInput" type={'text'} placeholder="Email" error={setEmailError} onChange={ (e) => setEmail(e.target.value) } /> 
                </div>
                <div class="divLogin">
                    <input class="passInput" type={'password'} placeholder="Password" error={setPassError}  onChange={ (e) => setPassWord(e.target.value) }/> 
                </div>
                <div class="divLogin">
                    <input class="btn_Login" type={'button'} value="Login" onClick={handleLogin}  /> 
                </div>
            </form>
        </div>

    )
}

export default LoginPage;