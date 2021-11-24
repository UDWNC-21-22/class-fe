import { Button, Container, Grid, makeStyles, Paper, TextField, Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";

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
    let user;
    const styles = useStyles();
    const [FullName, setFullName] = useState(()=>{
        const saved = localStorage.getItem('fullname');
        //const init = JSON.parse(saved);
        return saved || '';
    });
    const [UserName, setUserName] = useState(()=>{
        const saved = localStorage.getItem("username");
        //const init = JSON.parse(saved);
        return saved;
    })
    const [Email, setEmail] = useState(()=>{
        const saved = localStorage.getItem("email");
        //const init = JSON.parse(saved);
        return saved;
    })

    const {dataInfo} = useLocalContext();

    return (
        <div>
            {/* <Drawer /> */}
            <Container >
                {console.log(dataInfo)}
                <Box className={styles.container}>
                    <Paper className={styles.root}>
                        <Grid className={styles.grid}>
                            <Grid>
                                <Typography>Thông tin cá nhân</Typography>
                            </Grid>
                            <Grid>
                                <Typography>FullName</Typography>
                                <TextField fullWidth
                                    value={dataInfo.fullname}
                                    onChange={e=>{setFullName(e.target.value)}}
                                />
                                <Typography>Email</Typography>
                                <TextField fullWidth
                                    value={dataInfo.email}
                                    onChange={e=>{setEmail(e.target.value)}}
                                />
                                <Typography>User Name</Typography>
                                <Typography>{dataInfo.username}</Typography>
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