import React, { useEffect } from 'react';
import { useState } from 'react';
import {InputLabel, Select ,MenuItem, FormControl }from '@mui/material';
import { Dialog ,DialogActions,DialogContent ,DialogTitle} from '@mui/material';
import {Button , TextField} from '@mui/material';
import {OutlinedInput ,getStyles}  from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import '../Styles/AddFootwear.css';
import { createTheme, rgbToHex, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function AddFootwear(){

    const user = JSON.parse(window.localStorage.getItem('user-info'));
    const navigate = useNavigate();

    const [brand, setBrand] = useState('')
    const [brandError , setBrandError] = useState(false)
    const [gender, setGender] = useState('')
    const [genderError , setGenderError] = useState(false)
    const [type, setType] = useState('')
    const [typeError , setTypeError] = useState(false)
    const [price, setPrice] = useState('')
    const [priceError,setPriceError] = useState(false)
    const [image , setImage] = useState('')
    const [imageError , setImageError] = useState(false)
    const [name , setName] = useState('')
    const [nameError, setNameError] = useState(false)


    const [modelID ,setModelID] = useState('')
    const [model, setModel] = useState('')
    const [modelError , setModelError] = useState(false)
    const [allModels , setAllModels] = useState([])

    async function getAllModels(){
        await fetch("/Model/GetAllModels",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setAllModels(data);
            });
    }
    useEffect(() => {
        getAllModels();
    },[])

    const handleClose = () => {
        setOpen(false)
    }
    
    const handleSubmit = () => {

        setBrandError(false);setPriceError(false);setNameError(false);
        setGenderError(false);setImageError(false);setTypeError(false);

        if ( brand === ''){
            setBrandError(true);
        }
        if ( price === ''){
            setPriceError(true);
        }
        if ( name === ''){
            setModelError(true);
        }
        if( gender === ''){
            setGenderError(true);
        }
        if ( image === ''){
            setImageError(true);
        }
        if ( type === ''){
            setTypeError(true);
        }
        if(brandError  || nameError || typeError || priceError || imageError || genderError ){

            alert("Nisu popunjena sva potrebna polja")
        }
        if (brand && name && type && price && image && gender)
        {
            alert("POSTAVLJENO")
            addModel()
            setOpen(false)
        }
    }

    async function addModel(){
        
        var items = [];
        var users = [];
        


        const model = {
            brand: brand,
            name: name,
            type : type,
            price : price,
            items : items,
            image : image,
            discount : 0,
            gender : gender,
            users : users,
            user : user 
       }
       try{
        let result = await fetch("Model/CreateModel/", {
            method : 'POST',
            headers : {
              'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json; charset=utf-8'
            },
            body : JSON.stringify(model)
          });
          let a = await result.json();
          console.log(a.id);
          setModelID(a.id);  
       }
       catch (error)
       {
          //console.log(error)
       }
    }

    async function addFootwear(element){

        const footwear = {
            size : element,
            model : modelID,
            user : user
       }
       try{
        let result = await fetch("Footwear/CreateFootwear/", {
            method : 'POST',
            headers : {
              'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json; charset=utf-8'
            },
            body : JSON.stringify(footwear)
          });
          let a = await result.json();


       }
       catch (error)
       {
          //console.log(error)
       }



    }

    const handlePost = () => {
        alert("POSTAVLJENO")

        if (size[0] === ''){
            setSizeError(true);
        }
        if (model === '' && modelID === ''){
            setModelError(true);
        }
        if (modelID === ''){
            alert("Nema id");
        }
        if (size  && modelID ){
            //alert(model);
            size.forEach(element => {
                addFootwear(element);
            });        
        }
    }
    
    const handleClick = () => {
        setOpen(true)
      }
    
    const blackTheme = createTheme({
        palette: {
          primary: {
            main: "rgb(0,0,0)",
          },
        },
      });

    const [open, setOpen] = React.useState(false)

    
    const sizes = [
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
    ];


    const [size, setSize] = React.useState([]);
    const [sizeError,setSizeError] = useState(false);
      
    const handleChange = (event) => {
          const {
            target: { value },
          } = event;
          setSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
        };


        
    async function handleModelChange(event){
        setModel(event.target.value);
        setModelID(event.target.value);
    }

    return(
        <div class="AddFootwear">
        <ThemeProvider theme={blackTheme}>
            <form>
                <div class="row_Model_Size">   
                    
                    <div class="selectSize">
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Size</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={size}
                        error={sizeError}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        >
                        {sizes.map((size) => (
                            <MenuItem
                            key={size}
                            value={size}
                            >
                            {size}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </div>
                    <div class="MODEL">
                        <div class="selectModel">
                            <FormControl variant = "standard" 
                                sx={{                            
                                    width :"45%",}}>
                            <InputLabel id="demo-simple-select-label" sx={{}}  >Model</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={model}
                                label="Model"  
                                error={modelError}      
                                onChange={handleModelChange}
                            >
                                {allModels.map((model, index) => (
                                    <MenuItem value={model.id}>{model.name}</MenuItem>
                                ))}
                            </Select> 
                            </FormControl>
                            <input class="btn_AddNew" type={'button'} value='Add new' onClick={handleClick} />
                        </div>                          
                    </div>
                </div>
                <div class="row_Button">
                    <div class="divAdd">
                        <input class="btn_Add" type={'button'} value="Post" onClick={handlePost} /> 
                    </div>
                </div>
            </form>
        </ThemeProvider>
        <ThemeProvider theme={blackTheme}>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{
                   /* backgroundColor : "rgb(46, 45, 45)" ,*/
                    color : "#EF4765" ,
                }}>
                Add your model
                </DialogTitle>
                <DialogContent style={{
                    /*backgroundColor : "rgb(46, 45, 45)" ,*/
                
                }}>
                <FormControl variant = "standard" 
                        sx={{                            
                            width :"45%",
                            marginRight: "5%",
                            marginTop : "2.5%",
                            marginBottom : "5%",}}>
                    <InputLabel id="demo-simple-select-label" sx={{}}  >Brand</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brand}
                        label="Brand"    
                        error={brandError}    
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        <MenuItem value='Nike'>Nike</MenuItem>
                        <MenuItem value='Adidas'>Adidas</MenuItem>
                        <MenuItem value='Puma'>Puma</MenuItem>
                        <MenuItem value='Converse'>Converse</MenuItem>
                        <MenuItem value='Underarmour'>Underarmour</MenuItem>
                    </Select> 
                </FormControl>
                <TextField id="outlined-basic" label="Name" variant="outlined"  type="text" color="primary" maxRows ={'1'} required 
                            error={nameError}  onChange={(e) => setName(e.target.value)}
                            sx={{
                            width :"45%",
                            marginRight: "5%",
                            marginTop : "2.5%",
                            marginBottom : "5%",
                            }}/>

                <FormControl variant = "standard" 
                        sx={{                            
                            width :"45%",
                            marginRight: "5%",
                            marginTop : "2.5%",
                            marginBottom : "5%",}}>
                    <InputLabel id="demo-simple-select-label" sx={{}}  >Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"   
                        error={typeError}     
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value='Sneaker'>Sneaker</MenuItem>
                        <MenuItem value='Boot'>Boot</MenuItem>
                        <MenuItem value='Flip-Flop'>Flip-flop</MenuItem>
                    </Select> 
                </FormControl>

                    <TextField id="outlined-basic" label="Price" variant="outlined"  type="number"  maxRows ={'1'} required 
                           error={priceError}  onChange={(e) => setPrice(e.target.value)}
                            sx={{
                            width :"45%",
                            marginRight: "5%",
                            marginTop : "2.5%",
                            marginBottom : "5%",
                            }}/> 
                    <TextField id="outlined-basic" label="Image"   InputLabelProps={{ shrink : true }} variant="outlined"  type="file" color="primary" maxRows ={'1'} required 
                         error={imageError} onChange={(e) => setImage("../Images/"+e.target.value.substring(12))}
                            sx={{
                            width :"45%",
                            marginTop : "2.5%",
                            marginBottom : "5%",
                            marginRight : "5%"
                            }}/>   

                    <FormControl variant = "standard" 
                            sx={{                            
                                width :"45%",
                                marginRight: "5%",
                                marginLeft : "5",
                                marginTop : "2.5%",
                                marginBottom : "5%",}}>
                        <InputLabel id="demo-simple-select-label" sx={{}}  >Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"  
                            error={genderError}      
                            onChange={(e) => setGender(e.target.value)}>
                            <MenuItem value='men'>Male</MenuItem>
                            <MenuItem value='women'>Female</MenuItem>
                            <MenuItem value='kids'>МОША</MenuItem>
                        </Select> 
                    </FormControl>
                </DialogContent>
                <DialogActions style={{
                    /*backgroundColor :"rgb(46, 45, 45)",*/
                }}>
                <Button onClick={handleClose} sx={{fontWeight:"bold" , color:"#EF4765"  }}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" sx={{fontWeight:"bold" ,color:"#EF4765" ,background:"black"}}>Sumbit</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider > 
        </div>


    )
}

export default AddFootwear;