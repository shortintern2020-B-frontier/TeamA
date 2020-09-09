import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import ErrorMessage from './../components/ErrorMessage'
import { signup } from "../api"

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const classes = useStyles();
  const history = useHistory()

  const handleSignup = async () => {
    const body = {
      email: email,
      password: password,
      name: username
    }
    await signup(body)
      .then((res) => {
        if (res.msg === 'User created') {
          history.push('/login')
        }
      })
      .catch(err => setErrorMessage(err.message))
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h3" variant="h5">Sign Up</Typography>
        <ErrorMessage message={errorMessage} />
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button className={classes.submit} fullWidth variant="contained" color="primary" onClick={handleSignup}>
            Sign Up
          </Button>
        </form>
        <Link href="" onClick={() => history.push("/login")}>
          Loginへ戻る
        </Link>
      </div>
    </Container>
  );
}