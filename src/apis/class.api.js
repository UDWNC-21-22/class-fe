import AxiosBasic from "../services/api";
import urls from './urls'

const getClasses = () => {
    return AxiosBasic({
        url: urls.getClasses,
        method: 'GET'
    })
}

const createClass = ({name, description,ownerId}) => {
    return AxiosBasic({
        url: urls.register,
        method: 'POST',
        data:{
            name,
            description,
            ownerId
        }
    })
}

const classApi = {
    getClasses,
    createClass
}

export default classApi