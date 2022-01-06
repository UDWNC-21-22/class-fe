import {AxiosBasic} from "../services/api";
import urls from './urls'

const postComment = ({comment, studentId, classId, assignmentId})=> {
    return AxiosBasic ({
        url: urls.postComment({classId: classId, assignmentId: assignmentId}),
        method: 'POST',
        data:{
            comment,
            studentId
        }
    })
}

const getComment = ({studentId, classId, assignmentId}) => {
    console.log('id', studentId);
    return AxiosBasic({
        url: urls.getComment({classId: classId, assignmentId: assignmentId,studentId: studentId}),
        method: 'GET',
        data: {
            studentId: studentId
        }
    })
}

const commentApi = {
    postComment,
    getComment,
}

export default commentApi