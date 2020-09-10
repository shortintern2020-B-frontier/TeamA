import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { makeStyles, Theme } from '@material-ui/core/styles';
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
      <div className='back'>
        <div className={classes.paper}>
          <h3 id="h3_back">Sign Up</h3>
          <ErrorMessage message={errorMessage} />
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              className='login_form'
              fullWidth
              label="Username"
              required
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              className='login_form'
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
              className='login_form'
              type="password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button className={classes.submit} fullWidth variant="contained" onClick={handleSignup}>
              Sign Up
          </Button>
          </form>
          <Link href="" onClick={() => history.push("/login")}>
            <p className="account">Loginへ戻る</p>
          </Link>
        </div>
      </div>
    </Container>
  );
}