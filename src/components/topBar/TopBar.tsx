import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import auth from '../../utils/Authentication'
import authentication from "../../utils/Authentication";
import { useNavigate  } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import InputIcon from '@material-ui/icons/Input';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
     
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolBar: {
        backgroundColor: "#F0131E",
    },
    white:{
        backgroundColor:'white',
        height:'60px',
        width:'60px',
        marginRight:'10px'},  avatar: {
            width: 60,
            height: 60}
   
  }),

);
 
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function TopBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutButton = () =>{
    handleClickOpen();
  }
  const handleLogout = () => {
    // logout user
    authentication.logout(() =>{
  
     }) 
     navigate('/')
}

  if(auth.authenticated ){  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Avatar className={classes.white} > 
          <img src={'../images/marvelLogo.png'} alt="A"  width= "88px" />
          </Avatar>
          <Typography variant="h6" className={classes.title}>
            Marvel App
          </Typography>
          <Tooltip  title="Logout" >
          <IconButton color="inherit" onClick={handleLogoutButton}>  
            <InputIcon /> 
          </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            No
          </Button>
          <Button onClick={handleLogout} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
  }
  else{
    return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar  className={classes.toolBar}>
          <Avatar className={classes.white} > 
          <img src={'../images/marvelLogo.png'} alt="A"  width= "88px" />
          </Avatar>
            <Typography variant="h6" className={classes.title}>
              Welcome to Marvel App
            </Typography> 
          </Toolbar>
        </AppBar>
      </div>
    )
  }
   
}