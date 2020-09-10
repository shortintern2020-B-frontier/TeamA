import React, { useEffect, useState } from "react";
import MDSpinner from 'react-md-spinner';

import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";

import { asyncLocalStorage } from '../utils'
import { getTotalBadgeRanking, getTotalMealRanking, getWeeklyMealRanking } from "./../api"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import BadgeRankerList from "../components/BadgeRankerLists"
import MealLists from "../components/MealLists"

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center'
  },
  title: {
    margin: '30px'
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
  const [weeklyMealList, setWeeklyMealList] = useState<MealRank[]>([])
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();
  useLoginRedirect()

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
      await getWeeklyMealRanking(jwtToken)
        .then(r => {
          setWeeklyMealList(r.results)
        })
        .catch(err => {
          setErrorMessage(err.messgae)
        })
    };
    f()
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.main}>
        <div className="back_rank">
          <h3 className={classes.title} id="h3_back">Ranking</h3>
        </div>
        <ErrorMessage message={errorMessage} />
        <Paper className={classes.paper}>
          <div id="h3_back">Total Meal Ranking</div>
          {mealList[0] ? <MealLists mealLists={mealList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
        </Paper>
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h6">Weekly Meal Ranking</Typography>
          {weeklyMealList[0] ? <MealLists mealLists={mealList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
        </Paper>
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h6">Total Badge Ranking</Typography>
          {badgeList[0] ? <BadgeRankerList badgeList={badgeList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
        </Paper>
      </div>
    </Container>
  )
}

export default Home;