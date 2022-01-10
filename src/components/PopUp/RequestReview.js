import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import reviewApi from "../../apis/review.api";
import Notification from "../Notifications/Notification";
import severity from "../Notifications/severity";

const RequestReviewForm = ({ open, setOpen, assignmentId }) => {
  const { classId } = useParams();
  const [expectationGrade, setExpectationGrade] = useState('');
  const [explain, setExplain] = useState('');

  const [Notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await reviewApi.postReview({
        expectationGrade: expectationGrade,
        explainMessage: explain,
        classId: classId,
        assignmentId: assignmentId,
      });
      
      setExpectationGrade('');
      setExplain('');
      setOpen(false);
    } catch (err) {
      if (Object.keys(err).length > 0) {
        setNotify({
          isOpen: true,
          message: err?.message,
          type: severity.error,
        });
      } else {
        // An error has occurred
        alert("An error has occurred");
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill expectation grade and the reason
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="expectation grade"
            fullWidth
            value={expectationGrade}
            variant="standard"
            onChange={(e)=> {setExpectationGrade(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reason"
            fullWidth
            value={explain}
            variant="standard"
            onChange={(e)=> {setExplain(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Notification Notify={Notify} setNotify={setNotify} />
    </div>
  );
};

export default RequestReviewForm;
