import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const RequestReviewForm = ({ open, setOpen, assignmentId}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill expectation grade and the reason ${assignmentId}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="expectation grade"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Reason"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RequestReviewForm;
