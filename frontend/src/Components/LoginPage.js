import React from 'react';
import {useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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

      
      if (a === -1){
        alert("Nepostojeci korisnik");
      }
      else{
        
        window.localStorage.setItem('user-info',JSON.stringify(a.id));
        window.dispatchEvent(new Event('storage'));
        //console.log(a);
        navigate('/');
        
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
    if (passWord && email && emailCheck()){

        Login()
    }
}

    return(
        <div className='LoginForm'>
            <form>      
                <div className="divLogin">
                    <input className="emailInput" type={'text'} placeholder="Email" error={emailError} onChange={ (e) => setEmail(e.target.value) } /> 
                </div>
                <div className="divLogin">
                    <input className="passInput" type={'password'} placeholder="Password" error={passError}  onChange={ (e) => setPassWord(e.target.value) }/> 
                </div>
                <div className="divLogin">
                    <input className="btn_Login" type={'button'} value="Login" onClick={handleLogin}  /> 
                </div>
            </form>
        </div>

    )
}

export default LoginPage;