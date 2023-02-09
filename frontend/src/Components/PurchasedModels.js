import React from 'react';
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

function PurchasedModels(){
    const [models ,setModels] = useState(null);
    const [userID, setUserID] = useState(JSON.parse(window.localStorage.getItem('user-info')));

    useEffect(() => {
        fetch("/Purchase/GetUserPurchase/"+ userID ,
        {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
                setModels(data);
            });
      },[])

      return(
        <div>
            {models && models != null && userID && userID != null && <PurchasedModelsRender models={models}/>}
        </div>
       )
}

function PurchasedModelsRender({models}){

    return(
        <Box sx={{ flexGrow: 1,
            width:"89%", 
            position:"relative",
            left:"7%",
            marginBottom:"2%" }}>
            <Grid container spacing={2}>
                {models.map((model, index) => (
                <Grid xs={6} sm={4} md={3}>
                    <Card sx={{ maxWidth: 300 }}
                    key={index}
                    >
                        <CardMedia
                            sx={{ height: 140 }}
                            image = {model.image}
                        />
                        <Typography 
                            variant="h6"
                            component="div"
                            textAlign="end" 
                            fontWeight="bold"
                        >
                            {model.price} RSD
                        </Typography>
                        <CardContent>
                            <Typography 
                            gutterBottom 
                            textAlign="center" 
                            variant="h6" 
                            component="div">
                            {model.brand} {model.type} {model.name}
                            </Typography>
                            <Typography 
                            variant="h6" 
                            component="div"
                            textAlign="center" 
                            fontWeight="bold">
                            size: {model.size}
                            </Typography>
                        </CardContent>
                        <Typography 
                            variant="h7" 
                            fontWeight="bold"
                        >
                            {model.date}
                        </Typography>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default PurchasedModels;