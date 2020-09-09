import React from 'react'

import BadgeRanker from './BadgeRankerList'

interface BadgeRank {
  user_id: number;
  name: string;
  badge: number;
  point: number;
}

interface Props {
  badgeList: BadgeRank[]
}

const BadgeRankerList: React.FC<Props> = (props) => {

  const List = props.badgeList.map(data => {
    return (
      <BadgeRanker key={data.user_id} user_id={data.user_id} name={data.name} total_point={data.point} total_badge={data.badge} />
    )
  })

  return (
    <section>{List}</section>
  )
}

export default BadgeRankerList