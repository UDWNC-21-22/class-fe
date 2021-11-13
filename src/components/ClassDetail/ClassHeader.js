import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem} from "@material-ui/core";
import { Add, Apps } from "@mui/icons-material";
import React from "react";
import { CreateClass } from "..";
import { useLocalContext } from "../../context/context";
import { useStyles } from "./style";

const ClassHeader = ({ children }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const {
    setCreateClassDialog,
    setJoinClassDialog
  } = useLocalContext();

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>            
            
            <Typography variant="h6">
              {}
            </Typography>            
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />
            <Apps className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Avatar                               
                className={classes.icon}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
    </div>
  );
};

export default ClassHeader;