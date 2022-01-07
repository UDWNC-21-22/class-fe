import {AxiosBasic} from "../services/api";
import urls from './urls'

const getNotification = () => {
    return AxiosBasic({
        url: urls.getNotification,
        method: 'GET'
    })
}

const setNotification = ({notificationId}) => {
    return AxiosBasic({
        url: urls.setNotification({notificationId: notificationId}), 
        method: 'POST'
    })
}

const notificationApi = {
    getNotification,
    setNotification,
}

export default notificationApi