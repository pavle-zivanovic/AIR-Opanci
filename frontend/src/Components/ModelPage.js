import React, { useContext } from 'react';
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, rgbToHex, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import '../Styles/ModelPage.css';
import { fontSize } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { cartItemsContext, modelContext } from './ModelContext';


const model = {
    id:"63e0fecd36412978e977b298",
    brand:"Nike",
    name:"AIR Force Yellow",
    type:"Sneaker",
    price:22000,
    items:[32,33,34,35,36,37],
    image:"../Images/nike.jpg",
    discount:20,
    gender:"men",
    user:"jzlnikola",
    users:[]
}

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
                <Grid container spacing={2} style={{marginLeft:'38px', marginTop:'20px'}}>
                    {footwear!=null? footwear.map((item, index) => (
                        (footwear.map(f => f.size).filter((item, index_)=>index_<index).includes(item.size)==false && cartItems.map(f => f.item.id).includes(item.id)==false)?(
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
                <Card sx={{marginLeft:'38px', marginTop:'20px', backgroundColor:'rgb(50, 145, 255)',textAlign:'center', color:'white', borderRadius: '25px' }}
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