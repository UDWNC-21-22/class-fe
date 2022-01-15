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
import { useParams, useNavigate } from "react-router-dom";

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

const ResetPassword = () => {
  const styles = useStyles();
  const [changePassword, setChangePassword] = useState("");
  const [confirmChangePassword, setConfirmChangePassword] = useState("");
  const { email, id } = useParams();
  const navigate = useNavigate();

  const [Notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const resetPassword = async (e) => {
    try {
      e.preventDefault();

      await authApi.resetPassword({
        newPassword: changePassword,
        confirmPassword: confirmChangePassword,
        oldPassword: id,
        email: email,
      });

      setNotify({
        isOpen: true,
        message: "Change successed",
        type: severity.success,
      });
      setChangePassword("");
      setConfirmChangePassword("");
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
  };

  return (
    <Container>
      <Box className={styles.container}>
        <Paper className={styles.root}>
          <Grid className={styles.grid}>
            <form className={styles.changePassword} onSubmit={resetPassword}>
              <Typography>Change password</Typography>
              <TextField
                fullWidth
                label="New Password"
                placeholder="Enter new password"
                type="password"
                value={changePassword}
                onChange={(e) => {
                  setChangePassword(e.target.value);
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                placeholder="Re-enter new password"
                type="password"
                value={confirmChangePassword}
                onChange={(e) => {
                  setConfirmChangePassword(e.target.value);
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ margin: "8px 0" }}
                fullWidth
              >
                CHANGE PASSWORD
              </Button>

              <Button
                onClick={() => {
                  navigate("/login");
                }}
                variant="contained"
                style={{ margin: "8px 0" }}
                fullWidth
              >
                BACK TO LOGIN
              </Button>
            </form>
          </Grid>
        </Paper>
      </Box>
      <Notification Notify={Notify} setNotify={setNotify} />
    </Container>
  );
};

export default ResetPassword;
