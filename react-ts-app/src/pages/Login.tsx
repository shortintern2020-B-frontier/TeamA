import React, { useState } from 'react';
import { useHistory } from "react-router-dom"

import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';


import { login } from "../api"
import { asyncLocalStorage } from "../utils"
import ErrorMessage from './../components/ErrorMessage'


const useStyles = makeStyles((theme: Theme) =>
  ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);

export default function BasicTextFields() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password
    }
    await login(body)
      .then(res => {
        asyncLocalStorage.setItem("access_token", res.access_token)
        history.push("/timeline")
      })
      .catch(err => { setErrorMessage(err.message) })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h3" variant="h5">
          Login
        </Typography>
        <ErrorMessage message={errorMessage} />
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email" onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button className={classes.submit} fullWidth variant="contained" color="primary" onClick={handleLogin}>
            login
          </Button>
        </form>
        <Link href="" onClick={() => history.push("/signup")}>
          アカウントをお持ちでないですか？Sign Up
        </Link>
      </div>
    </Container>
  );
}