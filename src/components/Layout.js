import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Appbar() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUsername("");
    setPassword("");
  };

  const handleSubmit = () => {
    console.log(username);
    console.log(password);
  }
  const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" className={classes.menuButton} aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pogshop
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>Login</Button>
        </Toolbar>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            color="secondary"
            autoFocus
            required
            onChange = { (e) => {setUsername(e.target.value) }  }
            value = {username}
            margin="dense"
            id="email"
            label="Username"
            type="text"
            fullWidth
          />
            <TextField
            color="secondary"
            autoFocus
            required
            onChange = { (e) => {setPassword(e.target.value) }  }
            value = {password}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </AppBar>
}

