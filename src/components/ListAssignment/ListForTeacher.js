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
    const [totalGrade, setTotalGrade] = useState();
    
    useEffect( async () => {
        const data = await classApi.getGradeList({classId: classId});
        const total = await classApi.getTotalGrade({classId: classId});
        console.log('grade',total);
        setAssignments(data.assignments);
        setStudentsGrade(data.data);
        setIsUpdate(false);
    }, [])

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
  }

  const updateGrade = async ({assignmentId, memberId, grade}) => {
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
        totalGrade={totalGrade}
        setIsUpdate={setIsUpdate}
        uploadAssignmentGrade={uploadAssignmentGrade}
        downloadAssignmentGrade={downloadAssignmentGrade}
        updateGrade={updateGrade}
      />
    </Fragment>
  );
};

export default ListForTeacher;
