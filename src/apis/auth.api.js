import { Axios } from "axios";
import AxiosBasic from "../services/api";
import urls from './urls'

const login = async ({username, password}) => {
    return AxiosBasic({
        url: urls.login,
        method: 'POST',
        data:{
            username,
            password,
        }
    })
}

const register = async ({username, password, fullname, email}) => {
    return AxiosBasic({
        url: urls.register,
        method: 'POST',
        data:{
            username,
            password,
            fullname,
            email
        }
    })
}

const logout = async () => {
    return AxiosBasic({
        url: urls.logout,
        method: 'GET'
    })
}

const getInfo = async () => {
    return AxiosBasic({
        url: urls.info,
        method: 'GET'
    })
}

const changePassword = async ({curPass, changePass, confirmPass}) => {
    return AxiosBasic({
        url: urls.changePassword,
        method: "POST",
        data:{
            currentPassword: curPass,
            changePassword: changePass,
            confirmPassword: confirmPass
        }
    })
}

const changeProfile = async ({fullname, email}) => {
    console.log(fullname)
    console.log(email)
    return AxiosBasic({
        url: urls.changeProfile,
        method: "POST",
        data:{
            fullname,
            email,
        }
    })
}

const authenticate = ()=>{
    return AxiosBasic({
        url: urls.authenticate,
        method: 'GET'
    })
}

const googleLogin = async ({fullname, email, access_token}) => {
    return AxiosBasic ({
        url: urls.googleLogin,
        method: 'POST',
        data:{
            fullname,
            email,
            access_token
        }
    })
}

const authApi = {
    login,
    googleLogin,
    register,
    logout,
    getInfo,
    changeProfile,
    changePassword,
    authenticate
}

export default authApi