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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function FavoriteOrPostedModels({input}){
    const [models ,setModels] = useState(null);
    const [userID, setUserID] = useState(JSON.parse(window.localStorage.getItem('user-info')));

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
            });
      },[])

      return(
        <div>
            {models && models != null && userID && userID != null && <FavoriteModelsRender models={models} userID={userID} input={input}/>}
        </div>
       )
}

function FavoriteModelsRender({models, userID, input}){

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

const SetModelDiscount = (modelID, discount) =>{
    fetch("/Model/SetModelDiscount/"+modelID+"/"+discount,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
    })
    
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
                            image = {model.image}
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
                        {input === "favorites"
                        ?
                        <CardActions>
                            <IconButton sx={{width:"30px", height:"30px"}}
                            onClick={() => LikeTheModel(model.id, model.users.includes(userID) ? false : true)}>
                                <FavoriteIcon sx={{width:"27px", height:"27px",
                                color:model.users.includes(userID) ? "red" : "black"}} />
                            </IconButton>
                        </CardActions>
                        :
                        <CardActions>
                            <Typography 
                            variant="h7" 
                            component="div"
                            textAlign="center" 
                            fontWeight="bold">
                            discount:
                            </Typography>
                            <IconButton sx={{width:"30px", height:"30px"}}
                            onClick={() => SetModelDiscount(model.id, true)}>
                                <AddIcon sx={{width:"27px", height:"27px", color:"black"}} />
                            </IconButton>
                            <IconButton sx={{width:"30px", height:"30px"}}
                            onClick={() => SetModelDiscount(model.id, false)}>
                                <RemoveIcon sx={{width:"27px", height:"27px", color:"black"}} />
                            </IconButton>
                        </CardActions>
                        }
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default FavoriteOrPostedModels;