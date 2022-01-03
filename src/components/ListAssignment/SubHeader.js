import react, { Fragment } from "react";
import { Box, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((themes) => ({
  main: {
    display: "flex",
    justifyContent: "flex-end",
    padding: themes.spacing(3),
  },
  button: {
    display: "flex",
    color: "#1976d2",
    marginRight: themes.spacing.apply(3),
  },
}));

const SubHeader = ({
  downloadStudentList,
  uploadStudentList,
  exportGradeBoard,
}) => {
  const styles = useStyles();

  return (
    <Fragment>
      <Box className={styles.main}>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={downloadStudentList}
        >
          Download Student List
        </Button>
        <Button className={styles.button} variant="outlined" component="label">
          Upload Student List
          <input type="file" onChange={uploadStudentList} hidden/>
        </Button>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={exportGradeBoard}
        >
          Export All
        </Button>
      </Box>
    </Fragment>
  );
};

export default SubHeader;
