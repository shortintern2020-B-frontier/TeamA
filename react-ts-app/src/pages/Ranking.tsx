import React, { useEffect, useState } from "react";
import MDSpinner from 'react-md-spinner';

import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";

import { asyncLocalStorage } from '../utils'
import { getTotalBadgeRanking, getFolloweeTotalBadgeRanking, getTotalPointRanking, getFolloweeTotalPointRanking, getMonthlyPointRanking, getFolloweeMonthlyPointRanking, getTotalMealRanking, getWeeklyMealRanking } from "./../api"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import BadgeRankerList from "../components/BadgeRankerLists"
import MealLists from "../components/MealLists"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  const [followeebadgeList, setFolloweeBadgeList] = useState<BadgeRank[]>([]);
  const [pointList, setPointList] = useState<BadgeRank[]>([]);
  const [followeepointList, setFolloweePointList] = useState<BadgeRank[]>([]);
  const [monthlypointList, setMonthlyPointList] = useState<BadgeRank[]>([]);
  const [followeemonthlypointList, setFolloweeMonthlyPointList] = useState<BadgeRank[]>([]);
  const [mealList, setMealList] = useState<MealRank[]>([])
  const [weeklyMealList, setWeeklyMealList] = useState<MealRank[]>([])
  const [rankingType, setRankingType] = useState("Total Point Ranking")
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();
  const allRanking = ["Total Meal Ranking", "Weekly Meal Ranking", "Total Badge Ranking", "Followee Total Badge Ranking", "Total Point Ranking", "Followee Total Point Ranking", "Monthly Point Ranking", "Followee Monthly Point Ranking"]
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
      await getFolloweeTotalBadgeRanking(jwtToken)
        .then(r => {
          setFolloweeBadgeList(r.results)
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
      await getTotalPointRanking(jwtToken)
        .then(r => {
          setPointList(r.results)
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
      await getFolloweeTotalPointRanking(jwtToken)
        .then(r => {
          setFolloweePointList(r.results)
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
      await getMonthlyPointRanking(jwtToken)
        .then(r => {
          setMonthlyPointList(r.results)
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
      await getFolloweeMonthlyPointRanking(jwtToken)
        .then(r => {
          setFolloweeMonthlyPointList(r.results)
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
          <h3 className="animate__animated animate__jello" id="h3_back">Ranking</h3>
        </div>
        <ErrorMessage message={errorMessage} />
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel>Type of Ranking</InputLabel>
            <Select
              value={rankingType}
              onChange={e => setRankingType(e.target.value as string)}
            >
              {allRanking.map((item, index) => {
                return (
                  <MenuItem value={item} key={index}>{item}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <div hidden={rankingType !== "Total Meal Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Total Meal Ranking</div></Typography>
            {mealList[0] ? <MealLists mealLists={mealList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
        <div hidden={rankingType !== "Weekly Meal Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Weekly Meal Ranking</div></Typography>
            {weeklyMealList[0] ? <MealLists mealLists={mealList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
        <div hidden={rankingType !== "Total Badge Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Total Badge Ranking</div></Typography>
            {badgeList[0] ? <BadgeRankerList badgeList={badgeList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
        <div hidden={rankingType !== "Followee Total Badge Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Followee Total Badge Ranking</div></Typography>
            {followeebadgeList[0] ? <BadgeRankerList badgeList={followeebadgeList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
        <div hidden={rankingType !== "Total Point Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Total Point Ranking</div></Typography>
            {pointList[0] ? <BadgeRankerList badgeList={pointList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
        <div hidden={rankingType !== "Followee Total Point Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Followee Total Point Ranking</div></Typography>
            {followeepointList[0] ? <BadgeRankerList badgeList={followeepointList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
        <div hidden={rankingType !== "Monthly Point Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Monthly Point Ranking</div></Typography>
            {monthlypointList[0] ? <BadgeRankerList badgeList={monthlypointList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
        <div hidden={rankingType !== "Followee Monthly Point Ranking"}>
          <Paper className={classes.paper}>
            <Typography component="h4" variant="h6"><div id="service">Followee Monthly Point Ranking</div></Typography>
            {followeemonthlypointList[0] ? <BadgeRankerList badgeList={followeemonthlypointList} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
          </Paper>
        </div>
      </div>
    </Container>
  )
}

export default Home;