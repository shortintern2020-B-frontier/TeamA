import React, { useEffect, useState } from "react";
import MDSpinner from 'react-md-spinner';

import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import { asyncLocalStorage } from '../utils'
import { getTotalBadgeRanking, getTotalMealRanking } from "./../api"
import ErrorMessage from './../components/ErrorMessage'
import BadgeRankerList from "../components/BadgeRankerLists"
import MealLists from "../components/MealLists"

const useStyles = makeStyles((theme) => ({
  main: {
    // marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  paper: {
    display: "flex",
    overflow: "auto",
    margin: "32px 0px ",
    flexDirection: "column",
    padding: theme.spacing(4),
  },
  tableCell: {
    fontSize: "1.3rem",
  },
}));

interface BadgeRank {
  user_id: number
  name: string
  badge: number
  point: number
}

interface MealRank {
  meal_id: number
  meal_name: string
  count: number
}

const Home: React.FC = () => {
  const [badgeList, setBadgeList] = useState<BadgeRank[]>([]);
  const [mealList, setMealList] = useState<MealRank[]>([])
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      const jwtToken = await asyncLocalStorage.getItem('access_token')
      await getTotalBadgeRanking(jwtToken)
        .then(r => {
          setBadgeList(r.results)
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
      await getTotalMealRanking(jwtToken)
        .then(r => {
          setMealList(r.results)
        })
        .catch(err => {
          setErrorMessage(err.message)
        })
    };
    f()
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.main}>
        <Typography component="h2" variant="h5">Ranking</Typography>
        <ErrorMessage message={errorMessage} />
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h6">Meal Ranking</Typography>
          {mealList[0] ? <MealLists mealLists={mealList} /> : <MDSpinner size={56} />}
        </Paper>
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h6">Total Badge Ranking</Typography>
          {badgeList[0] ? <BadgeRankerList badgeList={badgeList} /> : <MDSpinner size={56} />}
        </Paper>
      </div>
    </Container>
  )
}

export default Home;