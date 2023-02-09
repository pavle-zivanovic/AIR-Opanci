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
import { useNavigate } from 'react-router-dom';
import { modelContext } from './ModelContext';

const blackTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(0,0,0)",
    },
  },
});

function ShowModels({gender, search}){
    const [models ,setModels] = useState(null);
    const [userID, setUserID] = useState(JSON.parse(window.localStorage.getItem('user-info')));

    useEffect(() => {
        fetch("/Model/GetModelGender/"+gender,
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
      },[gender])

      useEffect(() => {
        if(search != null)
        {
            fetch("/Model/SearchModels/"+search,
            {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) =>  res.json())
            .then((data) => {
                    setModels(data);
                });
        }
        else
        {
            fetch("/Model/GetModelGender/"+gender,
            {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) =>  res.json())
            .then((data) => {
                    setModels(data);
                });
        }
      
      },[search])

      return(
        <div>
            {models && models != null && <ShowModelsRender models={models} setModels={setModels} gender={gender} userID={userID}/>}
        </div>
       )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const model_ = {
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

function ShowModelsRender({models, setModels, gender, userID}){

  const navigate = useNavigate();
  let [category, setCategory] = React.useState([]);
  let [brand, setBrand] = React.useState([]);
  let [price, setPrice] = React.useState([]);

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeBrand = (event) => {
    const {
      target: { value },
    } = event;
    setBrand(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangePrice = (event) => {
    const {
      target: { value },
    } = event;
    setPrice(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const filters = [
    {
        id:0,
        name:"categories",
        items:["sneakers", "boots", "shoes", "slippers"],
        value:category,
        function:handleChangeCategory
    },
    {
        id:1,
        name:"brands",
        items:["nike", "adidas", "new balance", "puma", "reebok", "converse", "asics"],
        value:brand,
        function:handleChangeBrand
    },
    {
        id:2,
        name:"price",
        items:["0-5000", "5001-10000", "10001-15000", "15001-20000"],
        value:price,
        function:handleChangePrice
    }
]

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

 async function ApplyFilter(){
  if(category.length == 0)
    category = "empty";
  if(brand.length == 0)
    brand = "empty";
  if(price.length == 0)
    price = "empty";

  await fetch("/Model/FilterModels/"+category+"/"+brand+"/"+price+"/"+gender,
    {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => {
            setModels(data);
        });
}

useEffect(() => {
},[models])

const DeleteModel = (id) =>{
  modelID = id;

  fetch("/User/DeleteModel/"+userID+"/"+modelID,
  {
      method:"DELETE",
      headers:{
          "Content-Type":"application/json"
      },
  }).then((res) =>  res.json())
  .then((data) => {
          if(data == 0)
          {
            alert("Niste u mogucnosti da obrisete ovaj model obuce!");
          }
          else
          {
            window.location.reload(true)
          }
      });
}


    const {selectedModel, setSelectedModel} = useContext(modelContext);
    return(
        <Box sx={{ flexGrow: 1,
            width:"89%", 
            position:"relative",
            left:"7%",
            marginBottom:"2%" }}>
            <Grid container spacing={2}>
                {filters.map((filter, index) => (
                    <React.Fragment key={index}>
                      <Grid xs={6} sm={4} md={3}>
                          <FormControl sx={{ m: 1, width: 150 }}
                          key={index}>
                            <ThemeProvider theme={blackTheme}>
                              <InputLabel>{filter.name}</InputLabel>
                              <Select
                              key={index}
                              multiple
                              value={filter.value}
                              onChange={filter.function}
                              input={<OutlinedInput label={filter.name} />}
                              renderValue={(selected) => selected.join(',')}
                              MenuProps={MenuProps}
                              >
                              {filter.items.map((item) => (
                                  <MenuItem key={item.id} value={item}>
                                  <Checkbox checked={filter.value.indexOf(item) > -1} sx={{color:"black"}}/>
                                  <ListItemText primary={item} />
                                  </MenuItem>
                              ))}
                              </Select>
                            </ThemeProvider>
                          </FormControl>
                      </Grid>
                  </React.Fragment>
                ))}
                <Grid xs={6} sm={4} md={3}>
                  <button
                  onClick={()=>ApplyFilter()}
                  style={{
                    backgroundColor: "black",
                    borderRadius:"6px",
                    color: "white",
                    padding: "18px 32px",
                    textAlign: "center",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "4px 8px",
                    cursor: "pointer"
                  }}>
                    Apply filters
                  </button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {models.map((model, index) => (
                <Grid xs={6} sm={4} md={3}>
                    <Card sx={{ maxWidth: 300 }}
                    key={index}
                    >
                        <CardMedia
                            sx={{ height: 140 }}
                            image = {"../Images/" + model.image}
                            onClick={() => {navigate("/ModelPage"); setSelectedModel(model); console.log(JSON.stringify(model));}}
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
                            onClick={
                            localStorage.getItem('user-info') !== null 
                            ?
                            () => LikeTheModel(model.id, model.users.includes(userID) ? false : true)
                            :
                            () => alert("Morate da se ulogujete!")}>
                                <FavoriteIcon sx={{width:"27px", height:"27px",
                              color:model.users.includes(userID) ? "red" : "black"}} />
                            </IconButton>
                            <IconButton sx={{width:"30px", height:"30px"}}
                            onClick={
                            localStorage.getItem('user-info') !== null
                            ?
                            ()=>DeleteModel(model.id)
                            :
                            () => alert("Morate da se ulogujete!")}>
                                <DeleteIcon sx={{width:"27px", height:"27px", color:"black"}} />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ShowModels;