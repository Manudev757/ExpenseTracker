import { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningIcon from "@mui/icons-material/Warning";
type propTYpe = {
  handleClick: boolean;
  handleCloseAlert: Dispatch<SetStateAction<boolean>>;
  inputField: Dispatch<SetStateAction<string>>;
  calculate: () => void;
};

export default function AlertDialog({
  handleClick,
  handleCloseAlert,
  inputField,
  calculate,
}: propTYpe) {
  const handleClose = () => {
    handleCloseAlert(false);
  };
  const setInputField = (str: string) => {
    const type = str.slice(0, 1);
    if (type === "*") inputField(str);
  };
  return (
    <div>
      <Dialog
        open={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Transaction Exceeds the Allocated Budget !"}&nbsp;&nbsp;&nbsp;
          <WarningIcon sx={{ backgroundColor: "yellow" }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to continue the Transaction still ? If ok Enter your
            Extra budget and click Ok to Continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TextField
            autoFocus
            onChange={(e) => setInputField(e.target.value)}
            margin="dense"
            id="name"
            label="Enter your Extra Budget"
            type="string"
            variant="standard"
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                calculate();
              }
            }}
          />
          <Button onClick={calculate}>Ok</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
