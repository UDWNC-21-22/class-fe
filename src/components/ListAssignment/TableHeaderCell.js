import { Fragment, useState } from "react";
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
  } from "@material-ui/core";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import {useParams} from 'react-router-dom';
  import classApi from "../../apis/class.api";

const TableHeaderCell = ({element, downloadAssignmentGrade, setIsUpdate}) => {
    const {classId} = useParams();
  /**---Handle MenuList */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const download = async (e) => {
    e.preventDefault();
    
    await downloadAssignmentGrade(element.id);
  }

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('data', e.target.files[0]);
    setIsUpdate(true);
    await classApi.uploadtAssignmentGrade({classId: classId, assignmentId: element.id, file: formData});
  }

  const isDone = async (e) => {
    e.preventDefault();

    await classApi.markAsDone({classId: classId, assignmentId: element.id})
  }

  return (
    <Fragment>
      <div style={{ display: "flex", alignItems: "center" }}>
        {element.name}
      </div>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem>Save</MenuItem>
          <MenuItem onClick={isDone}>Mask As Done</MenuItem>
          <MenuItem
            onClick={download}
          >
            Export Template
          </MenuItem>
          <MenuItem>
          
          <Button component="label" >Import Grade<input type="file" onChange={upload} hidden /></Button>

          </MenuItem>
        </Menu>
      </div>
    </Fragment>
  );
};

export default TableHeaderCell;
