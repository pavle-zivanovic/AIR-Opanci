import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import '../Styles/Main.css';
import { Route ,Routes } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShowModels from './ShowModels';
import { useNavigate, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FavoriteModels from './FavoriteModels';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "35px",
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const pages = [
    {
      id: 0,
      text: "men",
      path: ""
    },
    {
      id: 1,
      text: "women",
      path: "women"
    },
    {
      id: 2,
      text: "kids",
      path: "kids"
    }
  ]

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMoreAnchorElRight, setMobileMoreAnchorElRight] = useState(null);
  const isMobileMenuOpenRight = Boolean(mobileMoreAnchorElRight);
  const handleMobileMenuCloseRight = () => {
    setMobileMoreAnchorElRight(null);
  };
  const handleMobileMenuOpenRight = (event) => {
    setMobileMoreAnchorElRight(event.currentTarget);
  };

  const renderMobileMenuRight = (
    <Menu
      anchorEl={mobileMoreAnchorElRight}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpenRight}
      onClose={handleMobileMenuCloseRight}
    >
      <MenuItem>
      <IconButton sx={{width:"50px", height:"50px"}}
      onClick={() => navigate("favorite")}>
            <Badge badgeContent={5} sx={{ color:"black"}}>
                <FavoriteBorderIcon sx={{width:"35px", height:"35px", color:"black"}} />
            </Badge>
            </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem>
      <IconButton sx={{width:"50px", height:"50px"}}>
        <Badge badgeContent={2} sx={{color:"black"}}>
            <ShoppingBagOutlinedIcon sx={{width:"35px", height:"35px", color:"black"}}/>
        </Badge>
       </IconButton>
        <p>Bag</p>
      </MenuItem>
      <MenuItem>
      <IconButton sx={{width:"50px", height:"50px"}}>
        <LoginOutlinedIcon sx={{width:"35px", height:"35px", color:"black"}}/>
       </IconButton>
        <p>Login</p>
      </MenuItem>
      <MenuItem>
      <IconButton sx={{width:"50px", height:"50px"}}>
        <AccountCircleOutlinedIcon sx={{width:"35px", height:"35px", color:"black"}}/>
       </IconButton>
        <p>Signup</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large">
          <AddIcon sx={{ color:"black" }}/>
        </IconButton>
        <p>Add footwear</p>
      </MenuItem>
    </Menu>
  );

  const [mobileMoreAnchorElLeft, setMobileMoreAnchorElLeft] = useState(null);
  const isMobileMenuOpenLeft = Boolean(mobileMoreAnchorElLeft);
  const handleMobileMenuCloseLeft = () => {
    setMobileMoreAnchorElLeft(null);
  };
  const handleMobileMenuOpenLeft = (event) => {
    setMobileMoreAnchorElLeft(event.currentTarget);
  };

  const renderMobileMenuLeft = (
    <Menu
      anchorEl={mobileMoreAnchorElLeft}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpenLeft}
      onClose={handleMobileMenuCloseLeft}
    >
      {pages.map((page) => (
                <MenuItem 
                  key={page.id}
                  onClick={() => navigate(page.path)}
                  className={location.pathname == "/" + page.path ? "active" 
                  :location.pathname == "//" + page.path ? "active" : null}
                  >
                  <p>{page.text}</p>
                </MenuItem>
          ))}
    </Menu>
  );

  const [searchtext, setSearchtext] = useState("");

  function getSearchValue(e){
    setSearchtext(e.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1, width:"100%" }}>
      <AppBar 
        position="sticky"
        sx={{ backgroundColor: "white", boxShadow: "none", width:"100%" }}>
        <Toolbar sx={{ height:"160px" }}>
        <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2, color:"black" }}
            onClick={handleMobileMenuOpenLeft}
          >
            <MenuIcon />
          </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
            <div className="logo" 
                style={{ backgroundImage:'url(../Images/name.png)'}}>
            </div>
        </Box>
            {pages.map((page) => (
                  <MenuItem 
                    key={page.id}
                    size="large"
                    onClick={() => navigate(page.path)}
                    className={location.pathname == "/" + page.path ? "active" 
                    :location.pathname == "//" + page.path ? "active" : null}
                    sx={{ mr: 1, 
                    display: { xs: 'none', sm: 'none', md:'block' }}}
                    >
                      <Typography 
                      textAlign="center"
                      variant="h5"
                      noWrap
                      sx={{
                      fontWeight:"bold",
                      color:"black"
                    }}>{page.text}</Typography>
                  </MenuItem>
            ))}
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <div className="logo" 
                    style={{ backgroundImage:'url(../Images/logo.png)'}}>
                </div>
            </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Search sx={{ color:"black" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={getSearchValue}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', sm:'none', md: 'flex' }}} >
            <Grid container>
                <Grid position="relative" bottom="45px"
                sm={12} md={12}>
                  <Tooltip title="Add footwear">
                    <IconButton size="small">
                      <AddIcon sx={{ color:"black" }}/>
                    </IconButton>
                  </Tooltip>
                    <Link
                    onClick={() => alert("Uloguj se")}
                    component="button"
                    sx={{color:"black", fontSize:"16px"}}
                    underline="hover">
                        Login|
                    </Link>
                    <Link
                    onClick={() => alert("Napravi nalog")}
                    component="button"
                    sx={{color:"black", fontSize:"16px"}}
                    underline="hover">
                        Signup 
                    </Link>
                </Grid>
                <Grid position="relative" bottom="10px"
                sm={12} md={4}>
                    <Tooltip title="Favorites">
                        <IconButton sx={{width:"40px", height:"40px", marginRight:"8px"}}
                        onClick={() => navigate("favorite")}>
                            <Badge badgeContent={5} sx={{ color:"black"}}>
                                <FavoriteBorderIcon sx={{width:"35px", height:"35px", color:"black"}} />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid position="relative" bottom="10px" right="6px"
                sm={12} md={4}>
                    <Tooltip title="Bag">
                        <IconButton sx={{width:"40px", height:"40px"}}>
                            <Badge badgeContent={2} sx={{color:"black"}}>
                                <ShoppingBagOutlinedIcon sx={{width:"35px", height:"35px", color:"black"}}/>
                            </Badge>
                        </IconButton>
                </Tooltip>
                </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { xs: 'block', sm:'block', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpenRight}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenuRight}
      {renderMobileMenuLeft}
      <Routes>
        <Route path="" element={<ShowModels gender={"men"} search={searchtext != "" ? searchtext : null} />} />
        <Route path="women" element={<ShowModels gender={"women"} search={searchtext != "" ? searchtext : null} />} />
        <Route path="kids" element={<ShowModels gender={"kids"} search={searchtext != "" ? searchtext : null} />} />
        <Route path="favorite" element={<FavoriteModels />} />
      </Routes>
    </Box>
  );
}

export default Main;