import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classApi from "../apis/class.api";
import ListForStudent from "../components/ListAssignment/ListForStudent";
import ListForTeacher from "../components/ListAssignment/ListForTeacher";

export default function RoleMiddleware() {
  const { classId } = useParams();
  const [isTeacher, setIsTeacher] = useState({bool: true});

  useEffect(async () => {
    async function fetchData() {
      // You can await here
      const response = await classApi.isTeacher({ classId: classId });
      setIsTeacher(response);
      // ...
    }
    fetchData();
  }, []);

  return <>{isTeacher.bool ? <ListForTeacher /> : <ListForStudent />}</>;
}
