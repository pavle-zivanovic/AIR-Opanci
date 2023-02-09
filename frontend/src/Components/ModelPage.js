import React, { useContext } from 'react';
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import '../Styles/ModelPage.css';
import { useNavigate } from 'react-router-dom';
import { cartItemsContext, modelContext } from './ModelContext';


function ModelPage(){

    const navigate = useNavigate();
    let [selectedItem, setSelectedItem] = React.useState(null);
    const {selectedModel, setSelectedModel} = useContext(modelContext);
    const {cartItems, setCartItems} = useContext(cartItemsContext);
    let [footwear, setFootwear] = React.useState([]);
    
    async function getAllFootwear(){
        await fetch("/Footwear/GetFootwearFromModel/" + selectedModel.id,
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setFootwear(data);
            console.log(data);
            });
    }

    useEffect(() => {
        
        if(selectedModel!=null){
            getAllFootwear();
        }

    },[selectedModel])

    const sizes=[];

    return(
        <div className='ModelPage'>
            <div className='LeftPart'>
                <img src={selectedModel.image} alt="Logo" />
            </div>
            <div className='RightPart'>
                <Typography style={{fontSize:'30px', marginLeft:'50px'}}>{selectedModel.gender + " " + selectedModel.type}</Typography>
                <Typography style={{fontSize:'50px', marginLeft:'50px'}}>{selectedModel.brand + " " + selectedModel.name}</Typography>
                <Typography style={{fontSize:'25px', marginLeft:'50px'}}>{(selectedModel.discount==0? (selectedModel.price) : (selectedModel.price*(100-selectedModel.discount)/100)) + " RSD"}</Typography>
                {selectedModel.discount!=0? <Typography style={{fontSize:'15px', marginLeft:'50px'}}>{selectedModel.discount+"% popusta"}</Typography>:null}
                <Grid container spacing={2} style={{marginLeft:'38px', marginBottom:'50px', marginTop:'20px'}}>
                    {footwear!=null? footwear.map((item, index) => (
                        (footwear.map(f => f.size).filter((item, index_)=>index_<index).includes(item.size)==false && (cartItems==null || cartItems.map(f => f.item.id).includes(item.id)==false))?(
                        <Grid xs={3} sm={3} md={3}>
                            <Card className='SizeCard' sx={{backgroundColor: (selectedItem!=null && item.id==selectedItem.item.id)?'rgb(50, 145, 255)':'black', textAlign:'center', color:'white', borderRadius: '25px', maxWidth: 300 }}
                            key={index}
                            onClick={() => {setSelectedItem({item:item, model:selectedModel});}}
                            >
                            <Typography style={{fontSize:'40px'}}> {item.size} </Typography>
                            </Card>
                        </Grid>):null
                    )):null}
                </Grid>
                {selectedItem!=null?(
                <Card sx={{marginLeft:'38px', marginTop:'20px', marginBottom:'50px', backgroundColor:'rgb(50, 145, 255)',textAlign:'center', color:'white', borderRadius: '25px' }}
                    onClick={() => {setCartItems(oldArray => [...oldArray, selectedItem]); alert("dodali ste artikl u korpu"); setFootwear(footwear.filter((item) => item.id !== selectedItem.item.id)); setSelectedItem(null);}}
                    >
                    <Typography style={{fontSize:'25px'}}> + Add to cart </Typography>
                </Card>):null
                }
            </div>
        </div>
    )
}

export default ModelPage;