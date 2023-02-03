import React from 'react';
import {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import '../Styles/SignUp.css';

function SignUpPage(){


    const [passWord , setPassWord] = useState('')
    const [passError , setPassError] = useState(false)
    const [email , setEmail] = useState('')
    const [emailError , setEmailError] = useState(false)
    const [firstName , setFirstName] = useState('')
    const [fnameError, setFirstNameError] = useState(false)
    const [lastName , setLastName] = useState('')
    const [lnameError,setLastNameError] = useState(false)
    const [phoneNo , setPhoneNo] = useState('')
    const [phoneError,setPhoneError] = useState(false)
    const [address , setAddress] = useState('')
    const [addressError , setAddressError] = useState(false)


    const navigate = useNavigate();

    async function signUP(){

        const user = {
            password: passWord,
            email: email,
            firstName : firstName,
            lastName : lastName,
            phone : phoneNo,
            address : address
       }
       try{
        let result = await fetch("User/CreateUser/", {
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


    // error check => pravljenjeNaloga( podaci [] )
const handleSignUp = () =>{

        setEmailError(false);setPassError(false);setLastNameError(false);
        setFirstNameError(false);setPhoneError(false);setAddressError(false);


        if (email === ''){
            setEmailError(true)
        }
        if (passWord === ''){
            setPassError(true)
        }
        if (firstName === ''){
            setFirstNameError(true)
        }
        if (lastName === ''){
            setLastNameError(true)
        }
        if (phoneNo === ''){
            setPhoneError(true)
        }
        if (address ===''){
            setAddressError(true)
        }
    
        if(passError  || fnameError || lnameError || phoneError || addressError ){

            alert("Nisu popunjena sva potrebna polja")
        }
        // ako je sve ok pravi se nalog i prebacuje nas na main 
        if(!emailCheck()){
            alert("Nevalidan email")
        }
        if ( firstName && lastName && passWord  && phoneNo  &&  address && emailCheck()){
            
            signUP()
        }
}

    return(
        <div class="SignUpForm">
            <form>
                <div class="row_Email_Pass">           
                    <div class="divSignUp">
                        <input class="emailInputS" type={'text'} placeholder="Email" error={emailError} onChange={ (e) => setEmail(e.target.value) } /> 
                    </div>
                    <div class="divSignUp">
                        <input class="passInputS" type={'password'} placeholder="Password" error={passError}  onChange={ (e) => setPassWord(e.target.value) } /> 
                    </div>
                </div>
                <div class="row_First_LastN">           
                    <div class="divSignUp">
                        <input class="emailInputS" type={'text'} placeholder="First Name" error={fnameError}  onChange={ (e) => setFirstName(e.target.value) } /> 
                    </div>
                    <div class="divSignUp">
                        <input class="emailInputS" type={'text'} placeholder="Last Name" error={lnameError}  onChange={ (e) => setLastName(e.target.value) } /> 
                    </div>
                </div>
                <div class="row_PhoneNo_Addr">           
                    <div class="divSignUp">
                        <input class="emailInputS" type={'phone'} placeholder="Phone number" error={phoneError}  onChange={ (e) => setPhoneNo(e.target.value) } /> 
                    </div>
                    <div class="divSignUp">
                        <input class="emailInputS" type={'text'} placeholder="Address"  error={addressError}  onChange={ (e) => setAddress(e.target.value) } /> 
                    </div>
                </div>
                <div class="row_Button">
                    <div class="divSignUp">
                        <input class="btn_SignUp" type={'button'} value="SignUp" onClick ={handleSignUp} /> 
                    </div>
                </div>
            </form>
        </div>

    )
}

export default SignUpPage;