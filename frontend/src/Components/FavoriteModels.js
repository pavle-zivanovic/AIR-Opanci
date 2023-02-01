import React from 'react';
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

function FavoriteModels(){
    const [models ,setModels] = useState(null);

    useEffect(() => {
        fetch("/Model/GetFavoriteModels/"+"63d82978e8579d58ea82fddf",
        {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
                setModels(data);
                console.log(data)
            });
      },[])

      return(
        <div>
            {models && models != null && <FavoriteModelsRender models={models} />}
        </div>
       )
}

function FavoriteModelsRender({models}){

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
                            image = {"../Images/" + model.image}
                        />
                        <Typography 
                            variant="h7" 
                            component="div"
                            textAlign="end" 
                            color="red"
                        >
                            {model.discount != 0 ? model.discount+"%" : null}
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
                            {model.price} RSD
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton sx={{width:"30px", height:"30px"}}>
                                <FavoriteBorderIcon sx={{width:"27px", height:"27px", color:"black"}} />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default FavoriteModels;