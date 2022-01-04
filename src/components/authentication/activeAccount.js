import { Grid, Link } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { Alert } from '@mui/material';
import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import authApi from '../../apis/auth.api';

const ActiveAccount = () => {
    const {id} = useParams();

    useEffect(async () => {
        console.log(id);
        await authApi.acctiveAccount({id: id})
    }, [])

    return (
        <Grid>
            <h1>Active account</h1>
            <Alert icon={<Check fontSize='inherit'/>} severity="success">
                Your account is active. Now you can 
                {' '}<Link href="/login">login</Link>{' '}
                to join class
            </Alert>
        </Grid>
    )
}

export default ActiveAccount;