import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MDSpinner from 'react-md-spinner';
import Container from '@material-ui/core/Container';

import { asyncLocalStorage } from '../utils'
import { getOtherStatus } from "./../api"
import useLoginRedirect from '../hooks/useLoginRedirect'
import ErrorMessage from './../components/ErrorMessage'
import MedalStatus from './../components/MedalStatus'


interface State {
  level: number
  meal_id: number
  meal_name: string
}

const Home: React.FC = () => {
  const [medalStatus, setMedalStatus] = useState<State[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const path = useLocation().pathname;
  const user_id = path.match(/\/([0-9]+)\/mypage/u)![1];
  useLoginRedirect()

  useEffect(() => {
    const f = async () => {
      const jwtToken = await asyncLocalStorage.getItem('access_token')
      await getOtherStatus(jwtToken, user_id)
        .then(res => {
          setIsLoading(false)
          setMedalStatus(res.results)
        })
        .catch(err => {
          setErrorMessage(err.message)
          setIsLoading(false)
        })
    }
    f()
  }, [])

  return (
    <Container maxWidth="xs">
      <div className="back_state">
        <h3 id="h3_back">My Status</h3>
      </div>
      <ErrorMessage message={errorMessage} />
      {medalStatus && !isLoading ? <MedalStatus medalList={medalStatus} /> : <p style={{ textAlign: 'center' }}><MDSpinner size={56} /></p>}
    </Container>
  )
}

export default Home;



