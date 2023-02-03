import React from 'react';
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

function AddFootwear(){

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

    const [model, setModel] = useState('')
    const [modelError , setModelError] = useState(false)


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
        if ( model === ''){
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
        if(brandError  || modelError || typeError || priceError || imageError || genderError ){

            alert("Nisu popunjena sva potrebna polja")
        }
        if (brand && model && type && price && image && gender)
        {
            alert("POSTAVLJENO")
            //setModel(name)
            setOpen(false)
        }
    }

    async function addFootwear(){

    }

    const handlePost = () => {
        alert("POSTAVLJENO")

        if (size[0] === ''){
            setSizeError(true);
        }
        if (model === ''){
            setModelError(true);
        }
        if (size && model ){
            alert(model);
            addFootwear();
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
    const handleModelChange = (event) => {
            setModel(event.target.value);
        };


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
                                <MenuItem value={10}>Air Force 1</MenuItem>
                                <MenuItem value={20}>Air Max 95</MenuItem>
                                <MenuItem value={30}>Jordan 1</MenuItem>
                                <MenuItem value={40}>VaporMax</MenuItem>
                                <MenuItem value={50}>Gazzelle</MenuItem>
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
                        <MenuItem value={10}>Nike</MenuItem>
                        <MenuItem value={20}>Adiddas</MenuItem>
                        <MenuItem value={30}>Puma</MenuItem>
                        <MenuItem value={40}>Converse</MenuItem>
                        <MenuItem value={50}>Underarmour</MenuItem>
                    </Select> 
                </FormControl>
                <TextField id="outlined-basic" label="Name" variant="outlined"  type="text" color="primary" maxRows ={'1'} required 
                            error={nameError}  onChange={handleModelChange}
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
                        <MenuItem value={10}>Sneaker</MenuItem>
                        <MenuItem value={20}>Boot</MenuItem>
                        <MenuItem value={30}>Flip-flop</MenuItem>
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
                            <MenuItem value={10}>Male</MenuItem>
                            <MenuItem value={20}>Female</MenuItem>
                            <MenuItem value={30}>МОША</MenuItem>
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