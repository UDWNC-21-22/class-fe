import React, { useState, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import { Navigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Signup from './registerForm';
import authApi from '../../apis/auth.api';
import cookie from 'react-cookies';

const Login = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [check, setChecked]=useState(false);

    const setData = (data) => {
        localStorage.setItem("username", data.username);
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("email", data.email);
    }

    const login = async (e) => {
        try {
            e.preventDefault()

            let response = await authApi.login({ username, password })
            console.log("response: ", response.data)
            console.log(1);
            setData(response.data);
            // set access_token to cookie
            cookie.save('access_token', response.data?.access_token)
            alert(response.message)
            setChecked(!check)
            window.open("/home", "_self", "")
        }
        catch (err) {
            console.log("ERROR login, err: ", err)
           
            if (Object.keys(err).length > 0) {
                alert(err?.message)
            }
            else{
                // An error has occurred
                alert('An error has occurred')
            }
        }
    }

    const handleSubmit = () => {
        if (check)
        <Link href="/home"/>
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={(e) => login(e)}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField onChange={(e)=> setUsername(e.target.value)} label='Username' placeholder='Enter username' fullWidth required />
                    <TextField onChange={(e)=> setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' fullWidth required />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>
                        Sign in
                    </Button>
                    <Typography >
                        <Link href="/#" >
                            Forgot password ?
                        </Link>
                    </Typography>
                    <Typography > Do you have an account ?
                        <Link href="/register" >
                            Register
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}

export default Login;