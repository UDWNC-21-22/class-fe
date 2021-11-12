import AxiosBasic from "../services/api";
import urls from './urls'

const login = ({username, password}) => {
    return AxiosBasic({
        url: urls.login,
        method: 'POST',
        data:{
            username,
            password,
        }
    })
}

const register = ({username, password, fullname, email}) => {
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

const getInfo = () => {
    return AxiosBasic({
        url: urls.info,
        method: 'GET'
    })
}

const authApi = {
    login,
    register,
    getInfo
}

export default authApi