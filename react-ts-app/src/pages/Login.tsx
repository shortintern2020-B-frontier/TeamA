import React, { useState } from 'react';
import { useHistory } from "react-router-dom"

import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
      <div className='back'>
        <div className={classes.paper}>
          <h3 id="h3_back">Login</h3>
          <ErrorMessage message={errorMessage} />
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              className="form_inside"
              margin="normal"
              required
              fullWidth
              color="primary"
              label="Email" onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              className="form_inside"
              required
              fullWidth
              label="Password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button className={classes.submit} fullWidth variant="contained" onClick={handleLogin}>
              login
            </Button>
          </form>
          <Link href="" onClick={() => history.push("/signup")}>
            <p className="account">アカウントをお持ちでないですか？Sign Up</p>
          </Link>
        </div>
      </div>
    </Container>
  );
}