import { useState } from "react";
import { styled } from "@mui/system";
import {
  Divider,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import TableHeaderCell from "./TableHeaderCell";
import Notification from "../Notifications/Notification";

const useStyles = makeStyles((themes) => ({
  TableHeader: {
    height: "100px",
  },
  TableHeaderCell: {
    display: "flex",
  },
  TableRow: {
    height: "65px",
  },
}));

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  `
);

const Cell = ({
  point,
  assignmentId,
  memberId,
  updateGrade,
  setIsUpdate,
  setNotify,
}) => {
  const [value, setValue] = useState(point);
  const [canSubmit, setCanSubmit] = useState(false);

  const submitValue = async (e) => {
    e.preventDefault();
    
    if(canSubmit){
      await updateGrade({assignmentId: assignmentId, memberId: memberId, grade: value})
      console.log('submited');
    }
    else{
      setValue(0)
    }
  };

  const changeValue = e => {
    e.preventDefault();
    setValue(e.target.value)
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      console.log(1);
      setNotify({
        isOpen: true,
        message: "Must be number",
        type: "error",
      });
    }
    else if(parsed < 0 || parsed > 10){
      console.log(2);
      setNotify({
        isOpen: true,
        message: "Must bewteen 0 to 10",
        type: "error",
      });
    }
    else{
      console.log(3);
      setCanSubmit(true);
    }
  }

  return (
    <div>
      <TextField
        style={{ width: "30px" }}
        value={value}
        onChange={changeValue}
        onBlur={submitValue}
      />
    </div>
  );
};

const Table = ({
  assignments,
  studentsGrade,
  setIsUpdate,
  uploadAssignmentGrade,
  downloadAssignmentGrade,
  updateGrade,
}) => {
  const styles = useStyles();
  const [Notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  return (
    <Root sx={{ maxWidth: "100%" }}>
      <table>
        <thead className={styles.TableHeader}>
          <tr>
            <th></th>
            {assignments.map((element, i) => (
              <th key={i}>
                <div className={styles.TableHeaderCell}>
                  <TableHeaderCell
                    setIsUpdate={setIsUpdate}
                    element={element}
                    downloadAssignmentGrade={downloadAssignmentGrade}
                    uploadAssignmentGrade={uploadAssignmentGrade}
                  />
                </div>
                <Divider />
                {element.isDone ? (
                  <p style={{ color: "gray" }}>Finish ✔</p>
                ) : (
                  <></>
                )}
              </th>
            ))}
            <th>Tổng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentsGrade.map((student, idx) => (
            <tr className={styles.TableRow} key={student.studentId}>
              <td style={{ width: 200 }}>
                {student.studentId != null || student.studentId != undefined ? (
                  <Link>{student.fullname}</Link>
                ) : (
                  <Typography>{student.fullname}</Typography>
                )}
              </td>
              {student.grades.map((grade, i) => (
                <td key={i} style={{ width: 110 }} align="right">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Cell
                      point={`${!grade.point ? "" : grade.point}`}
                      assignmentId={assignments[i].id}
                      memberId={student.id}
                      updateGrade={updateGrade}
                      setIsUpdate={setIsUpdate}
                      setNotify={setNotify}
                    />
                    <Typography
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      /10
                    </Typography>
                  </div>
                </td>
              ))}
              <td style={{ width: 110 }}>{student.total}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Notification Notify={Notify} setNotify={setNotify} />
    </Root>
  );
};

export default Table;
