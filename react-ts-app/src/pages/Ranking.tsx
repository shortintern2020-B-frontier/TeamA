import React, { useEffect, useState } from "react";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { asyncLocalStorage } from '../utils'
import { getTotalBadgeRanking, getTotalMealRanking } from "./../api"
import ErrorMessage from './../components/ErrorMessage'
import BadgeRankerList from "../components/BadgeRankerLists"
import MealLists from "../components/MealLists"

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
      <Typography component="h3" variant="h5">Ranking</Typography>
      <ErrorMessage message={errorMessage} />
      <Typography component="h4" variant="h6">Total Badge Ranking</Typography>
      {badgeList[0] ? <BadgeRankerList badgeList={badgeList} /> : <p>読み込み中</p>}
      <Typography component="h4" variant="h6">Meal Ranking</Typography>
      {mealList[0] ? <MealLists mealLists={mealList} /> : <p>読み込み中</p>}
    </Container>
  )
}

export default Home;