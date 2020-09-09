import React, { useEffect, useState } from "react";

import { asyncLocalStorage } from '../utils'
import { getMyStatus} from "./../api"
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

  useEffect(() => {
    const f = async () => {
      const jwtToken = await asyncLocalStorage.getItem('access_token')
      await getMyStatus(jwtToken)
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
    <>
      <h3>My Status Page</h3>
      <ErrorMessage message={errorMessage} />
      {medalStatus && !isLoading ? <MedalStatus medalList={medalStatus} /> : <p>読み込み中</p>}
    </>
  )
}

export default Home;



