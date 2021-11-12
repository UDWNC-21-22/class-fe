import { Avatar, Button, Container, Grid, makeStyles, Paper, TextField, Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import Drawer from '../Drawer/Drawer'

const useStyles = makeStyles(themes => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    root: {
        marginTop: themes.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        width: '70%'
    },
    changePassword: {
        display: 'flex',
        margin: themes.spacing(2),
        flexDirection: 'column',

    },
    grid: {
        width: '300px',
        margin: themes.spacing(5)
    }
}))

const dummy = {
    username: "ngdkhoi",
    password: "202cb962ac59075b964b07152d234b70",
    fullname: "Nguyễn Đình Khôi",
    email: "ngdkhoi27600@gmail.com",
}

const Profile = () => {
    const [FullName, setFullName] = useState(dummy.fullname);

    const styles = useStyles();

    return (
        <div>
            <Drawer />
            <Container >
                <Box className={styles.container}>
                    <Paper className={styles.root}>
                        <Grid className={styles.grid}>
                            <Grid>
                                <Typography>Thông tin cá nhân</Typography>
                            </Grid>
                            <Grid>
                                <Typography>FullName</Typography>
                                <TextField fullWidth
                                    value={FullName}
                                />
                                <Typography>Email</Typography>
                                <TextField fullWidth
                                    value={dummy.email}
                                />
                                <Typography>User Name</Typography>
                                <Typography>{dummy.username}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.root}>
                        <Grid className={styles.grid}>
                            <form className={styles.changePassword}>
                                <Typography>
                                    Change password
                                </Typography>
                                <TextField fullWidth
                                    label='Current Password'
                                    placeholder='Enter curent password'
                                    type='password' />
                                <TextField fullWidth
                                    label='New Password'
                                    placeholder='Enter new password'
                                    type='password' />
                                <TextField fullWidth
                                    label='Confirm Password'
                                    placeholder='Re-enter new password' 
                                    type='password'/>
                                <Button>Change Password</Button>
                            </form>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}

export default Profile;