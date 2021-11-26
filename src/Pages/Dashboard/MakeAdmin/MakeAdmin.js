import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Typography, Alert } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
  const { token } = useAuth();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleOnSubmit = (e) => {
    const user = { email };
    // send to the server
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log(data);
          setSuccess(true);
        }
      });

    e.preventDefault();
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Typography variant="h4">Make An Admin</Typography>
      <form variant="standard" onSubmit={handleOnSubmit}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          onBlur={handleOnBlur}
          type="email"
          label="Email"
          variant="standard"
        />
        <Button
          type="submit"
          variant="outlined"
          color="success"
          sx={{ marginLeft: "2rem" }}
        >
          Make Admin
        </Button>
      </form>
      {success && <Alert severity="success">Made Admin successfully!</Alert>}
    </Box>
  );
};

export default MakeAdmin;
