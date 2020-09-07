import React, { useEffect, useState } from "react";
import { getMyRanking } from "./../api"

const mockRankData = [
  { user_id: 1, name: "oomura", total_badge: 200, total_point: 32 },
  { user_id: 2, name: "kudo", total_badge: 23, total_point: 1 }
]

interface State {
  user_id: number
  name: string
  total_badge: number
  total_point: number
}

const Home: React.FC = () => {
  const [rankData, setRankData] = useState<State[]>([]);

  useEffect(() => {
    const f = async () => {
      const res = await getMyRanking('jwt')
      console.log(res);
      setRankData(res)
    }
    f()
  })

  return (
    <>
      <h3>Ranking Page</h3>
      {
        mockRankData.map((data) => {
          return (
            <ul>
              <li>{data.name}</li>
              <li>{data.total_badge}</li>
              <li>{data.total_point}</li>
            </ul>
          )
        })
      }
    </>
  )
}

export default Home;