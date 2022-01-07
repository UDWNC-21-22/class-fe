import {
  Container,
  Typography,
  makeStyles,
  Box,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import classApi from "../../apis/class.api";
import { useParams } from "react-router-dom";
import RedditTextField from "./RedditTextField";
import RequestReviewForm from "../PopUp/RequestReview";
import commentApi from "../../apis/comment.api";
import { useLocalContext } from "../../context/context";

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
    flexDirection: "column",
  },
  postComment: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  AccordionSummary: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: themes.spacing(2),
    marginRight: themes.spacing(2),
  },
  commentDiv: {
    display: "flex",
    flexDirection: "row",
    marginTop: themes.spacing(1)
  },
}));

const GradeTag = ({ assignment, grade, assignmentId }) => {
  const { dataInfo } = useLocalContext();
  const styles = useStyles();
  const { classId } = useParams();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);



  useEffect(async () => {
    try {
      const response = await commentApi.getComment({
        studentId: dataInfo.id,
        classId: classId,
        assignmentId: assignmentId,
      });
      if (response) {
        setCommentsList(response.comments);
      }
      setIsSubmit(false)
    } catch (err) {}
  }, [isSubmit]);

  const handleOpen = (e) => {
    e.preventDefault();

    setOpen(true);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      if(comment === '') {
        console.log('cmt', comment);
        return
      }
      else{
        await commentApi.postComment({
          comment: comment,
          classId: classId,
          assignmentId: assignmentId,
        });
        setIsSubmit(true);
        setComment('');
      }
      
    } catch (err) {
      if (Object.keys(err).length > 0) {
        alert(err?.message)
    }
    else {
        // An error has occurred
        alert('An error has occurred')
    }
      
    }
  };

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
        <AccordionDetails className={styles.AccordionDetail}>
            <div className={styles.postComment}>
              <Avatar />
              <RedditTextField
                label="Comment"
                id="reddit-input"
                variant="filled"
                style={{ marginLeft: 11, marginRight: 11 }}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: "#2979ff" }}
              >
                Submit
              </Button>
            </div>
            <div>
              {commentsList?.map((ele) => (
                <div className={styles.commentDiv}>
                  <Typography style={{marginRight: 10}}>{ele.role}: </Typography>{" "}
                  <Typography>{ele.comment}</Typography>
                </div>
              ))}
            </div>
        </AccordionDetails>
      </Accordion>
      <RequestReviewForm
        open={open}
        setOpen={setOpen}
        assignmentId={assignmentId}
      />
    </Paper>
  );
};

const ListForStudent = () => {
  const styles = useStyles();
  const { classId } = useParams();
  const [grades, setGrades] = useState();
  const { dataInfo } = useLocalContext();

  useEffect(async () => {
    const data = await classApi.getStudentGrade({ classId });
    setGrades(data);
  }, []);

  return (
    <Container>
      <Box className={styles.container}>
        <Grid className={styles.grid}>
          <Typography variant="h3" gutterBottom align="center">
            {grades?.fullname}
          </Typography>
        </Grid>
        {
          !dataInfo.studentId?<Typography>You have to match your student id to view your grade</Typography>:
          <div>
        {grades?.grades.map((ele, i) => (
          <GradeTag
            key={i}
            assignment={ele.name}
            grade={ele.grade}
            assignmentId={ele.id}
          />
        ))}
        <Paper
          className={styles.GradePaper}
          style={{ display: "flex", alignItems: "center", height: "50px" }}
        >
          <Grid
            className={styles.AccordionSummary}
            style={{ marginLeft: 30, marginRight: 55, fontWeight: "bold" }}
          >
            <Typography>Tổng: </Typography>
            <Typography>{grades?.total}</Typography>
          </Grid>
        </Paper>
        </div>
        }
      </Box>
    </Container>
  );
};

export default ListForStudent;
