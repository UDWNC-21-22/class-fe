import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import authApi from "../../apis/auth.api";
import Notification from "../Notifications/Notification";
import severity from "../Notifications/severity";
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((themes) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  root: {
    marginTop: themes.spacing(5),
    display: "flex",
    justifyContent: "center",
    width: "70%",
  },
  changePassword: {
    display: "flex",
    margin: themes.spacing(2),
    flexDirection: "column",
  },
  grid: {
    width: "300px",
    margin: themes.spacing(5),
  },
}));

const ForgotPassword = () => {
  const styles = useStyles();
  const navigate = useNavigate()

  const [email, setEmail] = useState();
  const [Notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const resetPassword = async (e) => {
    try {
        e.preventDefault();
  
        await authApi.forgotPassword({email: email})
        
        setNotify({
          isOpen: true,
          message: "Please check your mail",
          type: severity.success,
        });
      } catch (err) {
        if (Object.keys(err).length > 0) {
          setNotify({
            isOpen: true,
            message: err?.message,
            type: severity.error,
          });
        } else {
          // An error has occurred
          alert("An error has occurred");
        }
      }
  }

  return (
    <Container>
      <Box className={styles.container}>
      <Paper className={styles.root}>
        <Grid className={styles.grid}>
          <form className={styles.changePassword} onSubmit={resetPassword}>
            <Typography>Your email</Typography>
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button type="submit" color='primary' variant="contained" style={{margin: '8px 0'}} fullWidth>SEND EMAIL</Button>
            
            <Button onClick={()=>{navigate('/login')}} variant="contained" style={{margin: '8px 0'}} fullWidth>BACK TO LOGIN</Button>
          </form>
        </Grid>
      </Paper>
      </Box>
      <Notification Notify={Notify} setNotify={setNotify} />
    </Container>
  );
};

export default ForgotPassword;
