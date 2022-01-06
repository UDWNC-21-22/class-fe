import {AxiosBasic} from "../services/api";
import urls from './urls'

const postReview = ({expectationGrade, explainMessage, classId, assignmentId})=> {
    return AxiosBasic ({
        url: urls.requestReview({classId: classId, assignmentId: assignmentId}),
        method: 'POST',
        data:{
            expectationGrade,
            explainMessage
        }
    })
}

const getReview = ({classId, studentId})=> {
    return AxiosBasic ({
        url: urls.getReview({classId: classId, studentId: studentId}),
        method: 'GET',
    })
}

const markAsDoneReview = ({reviewId}) => {
    return AxiosBasic({
        url: urls.markAsDoneReview({reviewId: reviewId}),
        method: 'POST'
    })
}

const reviewApi = {
    postReview,
    getReview,
    markAsDoneReview
}

export default reviewApi