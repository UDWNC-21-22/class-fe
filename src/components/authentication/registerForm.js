import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Divider, Link } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Notification from '../Notifications/Notification';
import authApi from '../../apis/auth.api';
import severity from '../Notifications/severity';

const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const validate = () => {
        if (Password !== ConfirmPassword) {
            setNotify({
                isOpen: true,
                message: 'Confirm passord was wrong!',
                type: severity.error
            })
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validate()) {
                await authApi.register({
                    username: UserName,
                    password: Password,
                    fullname: FullName,
                    email: Email
                });
                setNotify({
                    isOpen: true,
                    message: 'Successed! Please check you mail to active account',
                    type: 'success'
                })
                setFullName('')
                setPassword('')
                setEmail('')
                setUserName('')
                setConfirmPassword('')
            }
        }
        catch (err) {
            console.log("ERROR login, err: ", err)

            if (Object.keys(err).length > 0) {
                alert(err?.message)
            }
            else {
                // An error has occurred
                alert('An error has occurred')
            }
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
                            type='email'
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
                            type='password'
                        />
                        <TextField fullWidth
                            label='Confirm Password'
                            placeholder="Confirm your password"
                            value={ConfirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            type='password'
                        />
                        <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                        <Divider style={{marginTop: '10px'}}/>
                        <Typography > If you have an account 
                        <Link href="/" >
                            Login
                        </Link>
                    </Typography>
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