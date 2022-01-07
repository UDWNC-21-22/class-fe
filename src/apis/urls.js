module.exports = {
    login: '/user/login',
    googleLogin: '/user/googlelogin',
    register: '/user/register',
    activeAccount: '/user/active/:id',
    forgotPassword: '/user/forgotPassword',
    resetPassword: '/user/resetPassword',
    logout: '/user/logout',
    info: '/user/info',
    isTeacher: (classId) => `/class/${classId}/isTeacher`,
    getClasses:'/class/me',
    getClassById:'/class/me/',
    getGrade:'/grade/:id',
    getMyGrade:'/grade/me',
    createClass: '/class/create',
    changePassword: '/user/changepassword',
    changeProfile: '/user/changeprofile',
    authenticate: '/user/authenticate',
    invite: '/class/invite',
    verify:'/class/invite/verify',
    updateAssignment:'/class/update-assignment',
    uploadStudentList: '/class/:classId/import',
    downloadStudentList: '/class/:classId/export',
    showStudentGradeList: '/class/:classId/grade',
    updateStudentId: '/user/updateStudentId',
    markAsDone: '/grade/:classId/:assignmentId/isDone',
    exportGradeBoard: '/class/:classId/grade/download',
    downloadAssignmentGrade: '/grade/:classId/:assignmentId/export',
    uploadtAssignmentGrade: '/grade/:classId/:assignmentId/import',
    updateStudentAssignmentGrade: '/grade/:classId/:assignmentId/:studentId',
    getClassMember: (classId) => `/class/${classId}/classMember`,
    getStudentGrade:(classId) => `/grade/${classId}/grades`,
    requestReview: ({classId, assignmentId}) => `/review/${classId}/${assignmentId}/postReview`,
    postComment: ({classId, assignmentId}) => `/comment/${classId}/${assignmentId}/postComment`,
    getComment: ({classId, assignmentId, studentId}) => `/comment/${classId}/${assignmentId}/getComment/${studentId}`,
    getReview: ({classId, studentId}) => `/review/${classId}/${studentId}/getReview`,
    markAsDoneReview: ({reviewId}) => `/review/${reviewId}`,
    getNotification: '/notification',
    setNotification: ({notificationId}) => `/notification/${notificationId}`
}