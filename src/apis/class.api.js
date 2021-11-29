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

const inviteMember = async ({email, classId, role}) => {
    return AxiosBasic({
        url: urls.invite,
        method: 'POST',
        data: {
            email,
            classId,
            role
        }
    })
}

const verifyMember = async ({inviteToken}) => {
    return AxiosBasic({
        url: urls.verify,
        method: 'POST',
        data: {
            inviteToken
        }
    })
}

const updateAssignment = async ({classId,assignments}) => {
    return AxiosBasic({
        url: urls.updateAssignment,
        method: 'POST',
        data: {
            classId,
            assignments
        }
    })
}

const classApi = {
    getClasses,
    createClass,
    getGrade,
    inviteMember,
    verifyMember,
    updateAssignment
}

export default classApi