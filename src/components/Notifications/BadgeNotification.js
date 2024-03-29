import {
  Typography,
  Menu,
  MenuItem,
  Badge,
  makeStyles,
} from "@material-ui/core";
import { NotificationsNone } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notificationApi from "../../apis/notification.api";
import { useLocalContext } from "../../context/context";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: "15px",
    color: "#5f6368",
    cursor: "pointer",
  },
}));

const Notice = ({ notice, setReFecth }) => {
  const navigate = useNavigate();
  const { dataInfo } = useLocalContext();

  const navigatePage = () => {
    if(notice.notificationCode == 1){
      navigate(`/${notice.elementIds.classId}/grades`);
    }
    else if(notice.notificationCode == 2){
      if(dataInfo.id == notice.elementIds?.studentId){
        navigate(`/${notice.elementIds.classId}/grades`);
      }
      else{
        navigate(`/${notice.elementIds.classId}/${notice.elementIds.studentId}`);
      }
    }
    else if(notice.notificationCode == 3){
      navigate(`/${notice.elementIds.classId}/${notice.elementIds.studentId}`);
    }
    else if(notice.notificationCode == 4){
      navigate(`/${notice.elementIds.classId}/grades`)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (notice.isRead) {
      navigatePage();
      return;
    }
    await notificationApi.setNotification({ notificationId: notice.id });
    setReFecth(true);
    navigatePage();
  };
  return (
    <div onClick={handleClick}>
      <Typography>{notice.notification}</Typography>
    </div>
  );
};

const BadgeNotification = () => {
  const classes = useStyles();
  //Notification dialog
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const handleClickNotification = (event) =>
    setAnchorElNotification(event.currentTarget);
  const handleCloseNotification = () => setAnchorElNotification(null);
  const [notification, setNotification] = useState([]);
  const [bagdeNumber, setBagdeNumber] = useState(0);
  const [reFecth, setReFecth] = useState(false);



  useEffect(async () => {
    const data = await notificationApi.getNotification();
    setNotification(data.notification);
    setBagdeNumber(data.notice);
    setReFecth(false);
  }, [reFecth]);

  useEffect(()=> {
    const fetchAPI = async () => {
      const data = await notificationApi.getNotification();
      setNotification(data.notification);
      setBagdeNumber(data.notice);
    }
    const interval = setInterval(() => {
      fetchAPI()
   }, 5000);
   return () => clearInterval(interval);
  },[])

  return (
    <>
      <Badge
        onClick={handleClickNotification}
        variant="dot"
        badgeContent={bagdeNumber}
        color="primary"
        className={classes.icon}
      >
        <NotificationsNone />
      </Badge>
      <Menu
        id="simple-menu"
        anchorEl={anchorElNotification}
        keepMounted
        open={Boolean(anchorElNotification)}
        onClose={handleCloseNotification}
      >
        {notification.map((ele, i) => (
          <MenuItem
            key={i}
            style={{ backgroundColor: !ele.isRead ? "gray" : "white" }}
          >
            <Notice notice={ele} setReFecth={setReFecth} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BadgeNotification;
