import React, { useContext } from 'react';
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import '../Styles/ModelPage.css';
import { useNavigate } from 'react-router-dom';
import { cartItemsContext } from './ModelContext';


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
        }}
    />
);

function CartPage(){
    const navigate = useNavigate();

    const {cartItems, setCartItems} = useContext(cartItemsContext);

    window.addEventListener("beforeunload", (event) => {
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
    });

    useEffect(() => {
        if(localStorage.getItem('cartItems')!=null && cartItems.length==0)
        {
            setCartItems(JSON.parse(localStorage.getItem('cartItems')));
            window.localStorage.setItem('cartItems', null);
        }
    },[])

    useEffect(() => {
        console.log(cartItems)
    },[cartItems])

    async function createPurchase(){

        const userID = localStorage.getItem('user-info')
        const purchase = {
            user: userID.substring(0, userID.length - 1).substring(1),
            footwear: cartItems.map((item)=> item.item.id),
            date : "Januar 9 2023",
            cena : cartItems.reduce((sum, item)=>{return sum + (item.model.discount==0? (item.model.price) : (item.model.price*(100-item.model.discount)/100))}, 0)
       }
       console.log(purchase);
    
        let result = await fetch("Purchase/CreatePurchase/", {
            method : 'POST',
            headers : {
              'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json; charset=utf-8'
            },
            body : JSON.stringify(purchase)
          });

          let a = await result.json();
          if ( a == -1)
          {
            alert("Ne mozete da kupite model koji ste vi postavili")
          }
         else
          {
            setCartItems([]);
            alert("uspesna kupovina")
          }
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div>
            <div style={{marginTop:'10px'}}>
             {cartItems.map((item, index) =>(
                <Typography style={{backgroundColor: index%2==0?'rgb(232, 246, 255)':'rgb(255, 255, 255)', textAlign:'right', fontSize:'25px', marginRight:'50px'}}>{item.model.brand + " " + item.model.name + " | Size " + item.item.size} {index!=0? ' ':' '}{(item.model.discount==0? (item.model.price) : (item.price*(100-item.model.discount)/100)) + " RSD"}</Typography>
            ))}
            </div>
            <ColoredLine color={'black'}></ColoredLine>
             <Typography style={{fontWeight:'bold', textAlign:'right', fontSize:'25px', marginRight:'50px'}}>Total: {(cartItems.reduce((sum, item)=>{return sum + (item.model.discount==0? (item.model.price) : (item.model.price*(100-item.model.discount)/100))}, 0))  + " RSD"}</Typography>
             <Card sx={{width:'500px', float:'right', marginRight:'40px', marginTop:'20px', backgroundColor:'rgb(50, 145, 255)',textAlign:'center', color:'white', borderRadius: '25px' }}
                    onClick={() => {navigate("/"); createPurchase();}}
                    >
                    <Typography style={{fontSize:'25px'}}> Purchase </Typography>
            </Card>
            </div>
            {cartItems.map((item, index) =>(
            <div className='ModelPage'>
                <div className='LeftPart'>
                    <img src={item.model.image} alt="Logo" />
                </div>
                <div className='RightPart'>
                    <Typography style={{fontSize:'30px', marginLeft:'50px'}}>{item.model.gender + " " + item.model.type}</Typography>
                    <Typography style={{fontSize:'50px', marginLeft:'50px'}}>{item.model.brand + " " + item.model.name + " | Size " + item.item.size}</Typography>
                    <Typography style={{fontSize:'25px', marginLeft:'50px'}}>{(item.model.discount==0? (item.model.price) : (item.model.price*(100-item.model.discount)/100)) + " RSD"}</Typography>
                    {item.model.discount!=0? <Typography style={{fontSize:'15px', marginLeft:'50px'}}>{item.model.discount+"% popusta"}</Typography>:null}
                    <Card sx={{marginLeft:'38px', marginTop:'20px', marginBottom:'50px', backgroundColor:'rgb(255, 65, 27)',textAlign:'center', color:'white', borderRadius: '25px' }}
                    onClick={() => {setCartItems(cartItems.filter((item_, index_) => index !== index_));}}
                    >
                        <Typography style={{fontSize:'25px'}}> Remove from card </Typography>
                    </Card>
                </div>
            </div>
            ))}
        </div>
    )
}

export default CartPage;