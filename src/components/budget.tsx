import React, { useEffect, useState, useRef } from "react";
import "../components/budget.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertDialog from "./Alerts/alert";

type amountDetails = {
  amount: number | string;
  date: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Budget = () => {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<any>();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [inputTxt, setInputtxt] = useState("");
  const [alerts, setAlert] = useState("");
  const [severe, setSevere] = useState<AlertColor>("success");
  const [budget, setBudget] = useState<amountDetails[]>([]);
  const [income, setIncome] = useState<amountDetails[]>([]);
  const [spend, setSpend] = useState<amountDetails[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const remaining = income.reduce((acc, obj) => {
      return Number(acc) + Number(obj.amount);
    }, 0);
    const spendAmt = spend.reduce((acc, obj) => {
      return Number(acc) + Number(obj.amount);
    }, 0);
    income.length <= 1
      ? setBalance(
          income.reduce((acc, obj) => {
            return Number(acc) + Number(obj.amount);
          }, 0)
        )
      : setBalance(Number(remaining) - spendAmt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income]);
  const calculateAmount = () => {
    navigator.onLine
      ? console.log("You are currently ONLINE!!")
      : console.log("You are currently OFFLINE!!");
    textRef.current.value = "";
    setOpenAlert(false);
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    const typeAmount = inputTxt?.slice(0, 1);
    const amount = Number(inputTxt?.slice(1, inputTxt.length));
    const data: amountDetails = {
      amount: amount != undefined ? amount : 0,
      date: datetime,
    };
    const trimmed = inputTxt.trim();
    setInputtxt("");
    if (!isNaN(amount) && trimmed.length > 1 && amount !== 0) {
      switch (typeAmount) {
        case "+":
          {
            setIncome((prev) => [...prev, data]);
            setAlert("Transaction Entered Successfully!");
            setSevere("success");
            handleClick();
          }
          break;
        case "-":
          {
            if (budget.length > 0) {
              const spendAmt = spend.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0);
              const budgetAmt = budget.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0);
              const incomeAmt = income.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0);
              if (spendAmt > budgetAmt || Number(data.amount) > incomeAmt) {
                setAlert("Insuffecient Balance !!");
                setSevere("error");
                handleClick();
              } else if (
                Number(data.amount) + spendAmt > budgetAmt &&
                incomeAmt > budgetAmt
              ) {
                setOpenAlert(true);
              } else if (spendAmt === incomeAmt) {
                setAlert("Add Income Amount to Spend!");
                setSevere("error");
                handleClick();
              } else {
                setSpend((prev) => [...prev, data]);
                setBalance((prev) => prev - Number(data.amount));
                setAlert("Transaction Entered Successfully!");
                setSevere("success");
                handleClick();
              }
            } else {
              setAlert("Set your Budget to Continue the Transaction");
              setSevere("info");
              handleClick();
            }
          }
          break;
        case "*":
          {
            setBudget((prev) => [...prev, data]);
            setAlert("Transaction Entered Successfully!");
            setSevere("success");
            handleClick();
          }
          break;
        default: {
          setAlert("Invalid Transaction Input");
          setSevere("error");
          handleClick();
        }
      }
    } else if (inputTxt === "") {
      setAlert("Invalid Transaction Input");
      setSevere("error");
      handleClick();
    } else {
      setAlert("Invalid Transaction Input");
      setSevere("error");
      handleClick();
    }
  };
  return (
    <div className="parentDiv">
      <div className="childDiv">
        <div className="headingText">Expense Tracker</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="displayData">
            <div>Your Balance</div>
            <div>₹ {balance}</div>
          </div>
          <div className="displayData">
            <div>Your Budget</div>
            <div style={{ color: "orange" }}>
              ₹{" "}
              {budget.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0) -
                spend.reduce((acc, obj) => {
                  return Number(acc) + Number(obj.amount);
                }, 0) ===
              0 ? (
                <s style={{ color: "red" }}>
                  {budget.reduce((acc, obj) => {
                    return Number(acc) + Number(obj.amount);
                  }, 0)}
                </s>
              ) : (
                budget.reduce((acc, obj) => {
                  return Number(acc) + Number(obj.amount);
                }, 0)
              )}
            </div>
          </div>
          <div className="displayData">
            <div>Your Spendable</div>
            <div style={{ color: "#009a00" }}>
              ₹{" "}
              {budget.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0) -
                spend.reduce((acc, obj) => {
                  return Number(acc) + Number(obj.amount);
                }, 0)}
            </div>
          </div>
        </div>
        <div className="tracker">
          <div className="borderDiv">
            <div>INCOME</div>
            <div style={{ color: "#1bcb0f" }}>
              ₹{" "}
              {income.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0)}
            </div>
          </div>
          <div>
            <hr></hr>
          </div>
          <div>
            <div>EXPENSE</div>
            <div style={{ color: "red" }}>
              ₹{" "}
              {spend.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0)}
            </div>
          </div>
          <div>
            <hr></hr>
          </div>
          <div>
            <div>SAVINGS</div>
            <div style={{ color: "#606060" }}>
              ₹{" "}
              {income.reduce((acc, obj) => {
                return Number(acc) + Number(obj.amount);
              }, 0) -
                spend.reduce((acc, obj) => {
                  return Number(acc) + Number(obj.amount);
                }, 0)}
            </div>
          </div>
        </div>
        <div className="sideHeading">History</div>
        <div className="history">
          <Accordion
            sx={{ borderRight: "5px solid green", marginBottom: "5px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="Typography">Income</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {income.map((e) => {
                return (
                  <div className="accodionDiv-In" key={Math.random()}>
                    <span style={{ fontSize: "12px" }}>{e.date}</span> ₹ +
                    {e.amount}
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRight: "5px solid red", marginBottom: "5px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="Typography">Expense</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {spend.map((e) => {
                return (
                  <div className="accodionDiv-Ex" key={Math.random()}>
                    <span style={{ fontSize: "12px" }}>{e.date}</span> ₹ -
                    {e.amount}
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ borderRight: "5px solid orange" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="Typography">Budget</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {budget.map((e) => {
                return (
                  <div className="accodionDiv-Bu" key={Math.random()}>
                    <span style={{ fontSize: "12px" }}>{e.date}</span> ₹{" "}
                    {e.amount}
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="inputHeading">
          <strong>Add New Transaction</strong>
        </div>
        <div className="inputField">
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    calculateAmount();
                  }
                }}
                inputRef={textRef}
                onChange={(e) => {
                  setInputtxt(e.target.value);
                }}
                id="standard-basic"
                label="Enter Your Transaction"
                variant="standard"
              />
            </Box>
          </div>
          <div style={{ lineHeight: "35px" }}>
            <p>
              <strong>Note* : </strong>Use Prefix as <b>' - '</b> (for Expense),{" "}
              <b>' + '</b>
              (for Income) and <b>' * '</b> (for Budget) when Entering your
              Transaction.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                calculateAmount();
              }}
              className="button"
            >
              Submit Transaction
            </button>
          </div>
        </div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={severe}
              sx={{ width: "100%" }}
            >
              {alerts}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <AlertDialog
        handleClick={openAlert}
        handleCloseAlert={setOpenAlert}
        calculate={calculateAmount}
        inputField={setInputtxt}
      />
    </div>
  );
};
