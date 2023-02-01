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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

function ShowModels({gender, search}){
    const [models ,setModels] = useState(null);

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
                console.log(data)
            });
      },[gender])

      return(
        <div>
            {models && models != null && <ShowModelsRender models={models} />}
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

function ShowModelsRender({models}){

  const [category, setCategory] = React.useState([]);
  const [brand, setBrand] = React.useState([]);
  const [size, setSize] = React.useState([]);
  const [price, setPrice] = React.useState([]);

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

  const handleChangeSize = (event) => {
    const {
      target: { value },
    } = event;
    setSize(
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
        name:"size",
        items:["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32",
        "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"],
        value:size,
        function:handleChangeSize
    },
    {
        id:3,
        name:"price",
        items:["0-5000", "5001-10000", "10001-15000", "15001-20000"],
        value:price,
        function:handleChangePrice
    }
]

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
                          </FormControl>
                      </Grid>
                  </React.Fragment>
                ))}
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

export default ShowModels;