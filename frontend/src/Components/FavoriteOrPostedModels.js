import React from 'react';
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

const userID = '63d82978e8579d58ea82fddf'; /*JSON.parse(window.localStorage.getItem('user-info'));*/

function FavoriteOrPostedModels({input}){
    const [models ,setModels] = useState(null);

    useEffect(() => {
        fetch("/Model/GetFavoriteOrPostedModels/"+ userID + "/" + input,
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

let modelID = null;

const LikeTheModel = (id, like) =>{
  modelID = id;

  if(like == true)
  {
    fetch("/User/LikeTheModel/"+userID+"/"+modelID,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
    })
  }
  else
  {
    fetch("/User/UnlikeTheModel/"+userID+"/"+modelID,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
    })
  }

  window.location.reload(true)
}

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
                            <IconButton sx={{width:"30px", height:"30px"}}
                            onClick={() => LikeTheModel(model.id, model.users.includes(userID) ? false : true)}>
                                <FavoriteIcon sx={{width:"27px", height:"27px",
                                color:model.users.includes(userID) ? "red" : "black"}} />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default FavoriteOrPostedModels;