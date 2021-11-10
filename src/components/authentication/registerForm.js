import React, { useEffect, useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Notification from '../Notifications/Notification';

const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }

    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const uri = process.env.REACT_APP_API_DEV + '/user/register';

    const register = () => {
        const dataRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": UserName,
                "password": Password,
                "email": Email,
                "fullname": FullName
            })
        }
        fetch(uri, dataRequest);
    }

    const validate = () => {
        if (Password !== ConfirmPassword) {
            setNotify({
                isOpen: true,
                message: 'Confirm passord was wrong!',
                type: 'error'
            })
            return false;
        }
        return true;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (validate())
        {
            //console.log(process.env);
            register();
            ///console.log({ FullName, Email, UserName, Password, ConfirmPassword });
        }
            
    }

    return (
        <div>
            <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth
                        label='Full Name'
                        placeholder="Enter your name"
                        name='FullName'
                        value={FullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                    <TextField fullWidth
                        label='Email'
                        placeholder="Enter your email"
                        value={Email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth label='User Name'
                        placeholder="Enter your name"
                        value={UserName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <TextField fullWidth
                        label='Password'
                        placeholder="Enter your password"
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField fullWidth
                        label='Confirm Password'
                        placeholder="Confirm your password"
                        value={ConfirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
        <Notification
                Notify={Notify}
                setNotify={setNotify} />
        </div>
    )
}

export default Signup;