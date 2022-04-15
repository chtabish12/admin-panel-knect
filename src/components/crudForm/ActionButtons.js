import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { useHistory } from "react-router-dom";

const ActionButtons = ({ initialTableData, editRow }) => {
  // console.log(initialTableData);
  
  // const [openProfitCenterModal, setOpenProfitCenterModal] = useState(false);
  // const handleProfitCenterModal = () => {
  //   setOpenProfitCenterModal(true);
  // };

  // const handleClose = () => {
  //   setOpenProfitCenterModal(false);
  // };
  // const handleDelete = () => {
  //   Modal.fire().then(({ isConfirmed }) => {
  //     if (isConfirmed) {
  //       mutate([id]);
  //     }
  //   });
  // };
  return (
    <>
      {/* <Tooltip title="Edit"> */}
      <IconButton
        onClick={() => {
          editRow(initialTableData);
        }}
      >
        <EditIcon color="secondary" />
      </IconButton>
      {/* </Tooltip> */}
      {/* <Tooltip>
        <Box
        className={clsx(
          [classes.deleteIcon]
        )}
        >
          <IconButton
          // onClick={handleDelete}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Tooltip> */}
      {/* </Show> */}
    </>
  );
};
export default ActionButtons;
