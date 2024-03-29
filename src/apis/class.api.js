import {AxiosBasic, AxiosDownload} from "../services/api";
import urls from './urls'

const getClasses = () => {
    return AxiosBasic({
        url: urls.getClasses,
        method: 'GET'
    })
}

const getClassById = ({id}) => {
    return AxiosBasic({
        url: `${urls.getClassById}${id}`,
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

const exportStudentList = async ({classId}) => {
    const uri = urls.downloadStudentList.split('/');
    console.log(uri);
    const response = await AxiosDownload({
        url: `/${uri[1]}/${classId}/${uri[3]}`,
        method: 'GET',
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'studentList.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
}

const importStudentList = ({classId, file}) => {
    const uri = urls.uploadStudentList.split('/');
    return AxiosBasic({
        url: `/${uri[1]}/${classId}/${uri[3]}`,
        method: 'POST',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
}

const getGradeList = async ({classId}) => {
    const uri = urls.showStudentGradeList.split('/');
    return await AxiosBasic({
        url: `/${uri[1]}/${classId}/${uri[3]}`,
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
}

const downloadAssignmentGrade = async ({classId, assignmentId}) => {
    const uri = urls.downloadAssignmentGrade.split('/');
    console.log(uri);
    const response = await AxiosDownload({
        url: `/${uri[1]}/${classId}/${assignmentId}/${uri[4]}`,
        method: 'GET',
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'AssignmentGrade.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
}

const uploadtAssignmentGrade = async ({classId, assignmentId, file}) => {
    const uri = urls.uploadtAssignmentGrade.split('/');
    //url: `/${uri[1]}/${classId}/${assignmentId}/${uri[4]}`,
    return AxiosBasic({
        url: `/${uri[1]}/${classId}/${assignmentId}/${uri[4]}`,
        method: 'POST',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
      });
}

const exportGradeBoard = async ({classId}) => {
    const uri = urls.exportGradeBoard.split('/');
    const response = await AxiosDownload({
        url: `/${uri[1]}/${classId}/${uri[3]}/${uri[4]}`,
        method: 'GET',
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'GradeBoard.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
}

const markAsDone = ({classId, assignmentId}) => {
    const uri = urls.markAsDone.split('/');
    return AxiosBasic({
        url: `/${uri[1]}/${classId}/${assignmentId}/${uri[4]}`,
        method: 'POST',
    })
}

const updateStudentAssignmentGrade = ({classId, assignmentId, memberId, grade}) => {
    const uri = urls.markAsDone.split('/');
    return AxiosBasic({
        url: `/${uri[1]}/${classId}/${assignmentId}/${memberId}`,
        data: {grade},
        method: 'POST',
    })
}

const isTeacher = ({classId}) => {
    return AxiosBasic({
        url: urls.isTeacher(classId),
        method: 'GET'
    })
}

const getClassMember = ({classId}) => {
    return AxiosBasic({
        url: urls.getClassMember(classId),
        method: 'GET',
    })
}

const getStudentGrade = ({classId}) => {
    return AxiosBasic({
        url: urls.getStudentGrade(classId),
        method: 'GET'
    })
}

const classApi = {
    getClasses,
    getClassById,
    createClass,
    getGrade,
    inviteMember,
    verifyMember,
    updateAssignment,
    exportStudentList,
    importStudentList,
    getGradeList,
    downloadAssignmentGrade,
    exportGradeBoard,
    uploadtAssignmentGrade,
    markAsDone,
    updateStudentAssignmentGrade,
    isTeacher,
    getClassMember,
    getStudentGrade
}

export default classApi