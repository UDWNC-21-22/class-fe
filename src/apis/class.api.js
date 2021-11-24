import AxiosBasic from "../services/api";
import urls from './urls'

const getClasses = () => {
    return AxiosBasic({
        url: urls.getClasses,
        method: 'GET'
    })
}

const getGrade = ({classID}) => {
    return AxiosBasic({
        url: urls.getGrade,
        method: 'GET',
        data:{classID}
    })
}

const createClass = ({name, description,ownerId}) => {
    return AxiosBasic({
        url: urls.createClass,
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
    createClass,
    getGrade
}

export default classApi