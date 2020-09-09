import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { asyncLocalStorage } from './../utils'

export default function useLoginRedirect() {
  const history = useHistory();

  useEffect(() => {
    const f = async () => {
      const token = await asyncLocalStorage.getItem('access_token')
      if (token !== '0') {
        history.push('/timeline')
      }
    }
    f()
  }, [history])
}