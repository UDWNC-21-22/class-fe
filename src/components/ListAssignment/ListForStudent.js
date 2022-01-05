import {
  Container,
  Typography,
  makeStyles,
  Box,
  Paper,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import classApi from "../../apis/class.api";
import Notification from "../Notifications/Notification";
import severity from "../Notifications/severity";
import { useParams } from "react-router-dom";
import RedditTextField from "./RedditTextField";
import { RateReviewOutlined } from "@material-ui/icons";
import RequestReviewForm from "../PopUp/RequestReview";

const useStyles = makeStyles((themes) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  root: {
    marginTop: themes.spacing(5),
    display: "flex",
    justifyContent: "center",
    width: "70%",
  },
  changePassword: {
    display: "flex",
    margin: themes.spacing(2),
    flexDirection: "column",
  },
  grid: {
    width: "300px",
    margin: themes.spacing(5),
  },
  divider: {
    background: themes.palette.divider,
    marginTop: "10px",
    backgroundColor: "black",
  },
  name: {
    display: "flex",
    textAlign: "center",
  },
  GradePaper: {
    margin: themes.spacing(1),
    width: "650px",
  },
  AccordionDetail: {
    display: "flex",
    width: "100%",
    flexDirection: 'row'
  },
  AccordionSummary: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: 'center',
    marginLeft: themes.spacing(2),
    marginRight: themes.spacing(2),
  },
}));

const GradeTag = ({assignment, grade, assignmentId}) => {
    const styles = useStyles();
    const { classId } = useParams();
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        e.preventDefault();
  
        setOpen(true);
    }

    return (
        <Paper className={styles.GradePaper}>
            <Accordion
              className={styles.Accordion}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <AccordionSummary>
                <div className={styles.AccordionSummary}>
                  <Typography>{assignment}</Typography>
                  <Typography>{grade}</Typography>
                  
                </div>
                <Button onClick={handleOpen}>Review</Button>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.AccordionDetail}>
                  <Avatar />
                  <RedditTextField
                    label="Comment"
                    id="reddit-input"
                    variant="filled"
                    style={{ marginLeft: 11, marginRight: 11 }}
                  />
                  <Button style={{backgroundColor:'#2979ff'}}>Submit</Button>
                </div>
              </AccordionDetails>
            </Accordion>
            <RequestReviewForm
                open={open}
                setOpen={setOpen}
                assignmentId={assignmentId}
             />
          </Paper>
    )
}

const ListForStudent = () => {
  const styles = useStyles();
  const { classId } = useParams();
  const [grades, setGrades] = useState();


  useEffect(async () => {
    const data = await classApi.getStudentGrade({ classId });
    setGrades(data);
  }, []);

  return (
    <Container>
      <Box className={styles.container}>
        <Grid className={styles.grid}>
          <Typography variant="h3" gutterBottom className={styles.name}>
            {grades?.fullname}
          </Typography>
        </Grid>
        {grades?.grades.map((ele, i) => (
          <GradeTag key={i}
            assignment={ele.name}
            grade={ele.grade}
            assignmentId={ele.id}
          />
        ))}
        <Paper  className={styles.GradePaper} style={{ display: 'flex', alignItems: 'center' ,height: '50px'}}>
          <Grid className={styles.AccordionSummary} style={{marginLeft: 30, marginRight: 55, fontWeight: 'bold'}}>
            <Typography>Tổng: </Typography>
            <Typography>{grades?.total}</Typography>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ListForStudent;
