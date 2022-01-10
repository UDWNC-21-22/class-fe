import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@material-ui/core";
  
  const UnMapRequest = ({ open, setOpen }) => {
 
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>NOTE</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please send mail to midtermweb1@gmail.com with the reason for help
            </DialogContentText>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default UnMapRequest;
  