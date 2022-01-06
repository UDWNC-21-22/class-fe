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
import Notification from "../Notifications/Notification";
import severity from "../Notifications/severity";
import { useParams } from "react-router-dom";
import RedditTextField from "./RedditTextField";
import RequestReviewForm from "../PopUp/RequestReview";
import commentApi from "../../apis/comment.api";
import { useLocalContext } from "../../context/context";
import reviewApi from "../../apis/review.api";

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
    marginTop: themes.spacing(1),
  },
  explanatonDiv: {
    width: "550px",
    marginTop: themes.spacing(1.5)
  },
}));

const GradeTag = ({
  reviewId,
  assignment,
  scoreRate,
  currentGrade,
  expertationGrade,
  explainMessage,
}) => {
  const { dataInfo } = useLocalContext();
  const styles = useStyles();
  const { classId, studentId } = useParams(); 
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const [Notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(async () => {
    try {
      const response = await commentApi.getComment({
        studentId: studentId,
        classId: classId,
        assignmentId: assignment.id,
      });
      if (response) {
        setCommentsList(response.comments);
      }

      setIsSubmit(false);
    } catch (err) {}
  }, [isSubmit]);

  const handleDone = async (e) => {
    try{
        e.preventDefault();
        await reviewApi.markAsDoneReview({reviewId: reviewId});

        setNotify({
            isOpen: true,
            message: "Review was done",
            type: severity.success,
          });
    }
    catch(err){}

  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (comment === "") {
        return;
      }
      console.log(comment);
      await commentApi.postComment({
        comment: comment,
        classId: classId,
        assignmentId: assignment.id,
        studentId: studentId,
      });

      setIsSubmit(true);
      setComment("");
    } catch (err) {}
  };

  return (
    <Paper className={styles.GradePaper}>
      <Accordion
        className={styles.Accordion}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <AccordionSummary>
          <div>
            <div className={styles.AccordionSummary}>
              <div style={{width: '100px'}}>
                <Typography align="center">{assignment.name}</Typography>
                <Typography align="center">{scoreRate}đ</Typography>
              </div>
              <div className={styles.AccordionSummary} style={{width: '300px', marginRight: 100}}>
                <div>
                  <Typography align="center">Current Grade</Typography>
                  <Typography align="center">{currentGrade}</Typography>
                </div>
                <div>
                  <Typography align="center">Expertation Grade</Typography>
                  <Typography align="center">{expertationGrade}</Typography>
                </div>
              </div>
            </div>
            <div className={styles.explanatonDiv}>
              <Typography>Explanation:</Typography>
              <Typography>{explainMessage}</Typography>
            </div>
          </div>
          <div style={{display: 'flex', justifyItem: 'center'}}>
          <Button
            onClick={handleDone}
            style={{ backgroundColor: "#90a4ae", height: "30%" }}
          >
            Done
          </Button>
          </div>
        </AccordionSummary>
        <AccordionDetails className={styles.AccordionDetail}>
          <div className={styles.postComment}>
            <Avatar />
            <RedditTextField
              label="Comment"
              id="reddit-input"
              variant="filled"
              value={comment}
              style={{ marginLeft: 11, marginRight: 11 }}
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
                <Typography style={{ marginRight: 10 }}>
                  {ele.role}:{" "}
                </Typography>{" "}
                <Typography>{ele.comment}</Typography>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Notification Notify={Notify} setNotify={setNotify} />
    </Paper>
  );
};

const ReviewList = () => {
  const styles = useStyles();
  const { classId, studentId } = useParams();
  const [review, setReview] = useState();
  const [studentName, setStudentName] = useState("");

  useEffect(async () => {
    const data = await reviewApi.getReview({
      classId: classId,
      studentId: studentId,
    });
    setStudentName(data.fullname);
    setReview(data.review);
  }, []);

  return (
    <Container>
      <Box className={styles.container}>
        <Grid className={styles.grid} style={{width: '100%'}}>
          <Typography
            variant="h3"
            gutterBottom
            align="center"
          >
            {studentName}
          </Typography>
        </Grid>
        {review?.map((ele, i) => (
          <GradeTag
            key={i}
            reviewId={ele.reviewId}
            assignment={ele.assignment}
            scoreRate={ele.scoreRate}
            currentGrade={ele.currentGrade}
            expertationGrade={ele.expertationGrade}
            explainMessage={ele.explainMessage}
          />
        ))}
      </Box>
    </Container>
  );
};

export default ReviewList;
