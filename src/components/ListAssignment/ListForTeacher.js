import { Fragment, useState, useEffect } from "react";
import SubHeader from "./SubHeader";
import Table from './Table';
import {useParams} from 'react-router-dom';
import classApi from "../../apis/class.api";

const ListForTeacher = () => {
    const {classId} = useParams();
    const [assignments, setAssignments] = useState([]);
    const [studentsGrade, setStudentsGrade] = useState([]);
    const [isUpdate, setIsUpdate] = useState([true]);
    
    useEffect( async () => {
        const data = await classApi.getGradeList({classId: classId});
        setAssignments(data.assignments);
        setStudentsGrade(data.data);
        setIsUpdate(false);
    }, [isUpdate])

  const downloadStudentList = async (e) => {
    e.preventDefault();
    await classApi.exportStudentList({classId: classId})
  }

  const uploadStudentList = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('data', e.target.files[0]);
    console.log(formData);
    await classApi.importStudentList({classId: classId, file: formData})
  }

  const exportGradeBoard = async (e) => {
    e.preventDefault();
    await classApi.exportGradeBoard({ classId: classId });
  }

  const downloadAssignmentGrade = async (assignmentId) => {
    await classApi.downloadAssignmentGrade({classId: classId, assignmentId: assignmentId});
  }

  const uploadAssignmentGrade = async ({assignmentId, file}) => {
    const formData = new FormData();
    formData.append('File', file);
    await classApi.uploadtAssignmentGrade({classId: classId, assignmentId: assignmentId, file: formData});
    setIsUpdate(true)
  }

  const updateGrade = async ({assignmentId, memberId, grade}) => {
    setIsUpdate(true);
    await classApi.updateStudentAssignmentGrade({classId, assignmentId, memberId, grade});
  }

  return (
    <Fragment>
      <SubHeader
        downloadStudentList={downloadStudentList}
        uploadStudentList={uploadStudentList}
        exportGradeBoard={exportGradeBoard}
      />
      <Table
        assignments={assignments}
        studentsGrade={studentsGrade}
        setIsUpdate={setIsUpdate}
        uploadAssignmentGrade={uploadAssignmentGrade}
        downloadAssignmentGrade={downloadAssignmentGrade}
        updateGrade={updateGrade}
      />
    </Fragment>
  );
};

export default ListForTeacher;
