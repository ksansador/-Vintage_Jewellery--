import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';

const useStyles = makeStyles()(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    },
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
}));

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = useSelector(state => state.users.user);

  return (
    <>
     <AppBar position="fixed" sx={{bgcolor: '#576235'}} >
       <ToastContainer />
       <Toolbar >
         <Grid container justifyContent="space-between" alignItems="center">
           <Grid item>
             <Typography variant="h6" sx={{display: 'flex', alignItems: 'center'}} >

               <Link to="/" className={classes.mainLink}>
               Vintage  Jewellery
               </Link>
               <DiamondSharpIcon sx={{marginLeft: '10px'}}/>
             </Typography>
           </Grid>

           <Grid item>
             {user ? <UserMenu user={user}/> : <Anonymous/>}
           </Grid>
         </Grid>
       </Toolbar>
     </AppBar>
     <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;