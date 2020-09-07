import React, { useEffect, useState } from "react";
import { getMyStatus } from "./../api"

interface State {

}

const Home: React.FC = () => {

  const [userInfo, setUserInfo] = useState<State>()
  console.log(userInfo);

  useEffect(() => {
    const f = async () => {
      const res = await getMyStatus("jwt")
      console.log(res);
      setUserInfo(res)
    }
    f()
  })

  return (
    <div>My Status Page</div>
  )
}

export default Home;



