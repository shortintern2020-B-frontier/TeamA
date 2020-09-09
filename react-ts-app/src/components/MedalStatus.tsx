import React from 'react';

interface MedalItem {
  level: number
  meal_id: number
  meal_name: string
}

interface Props {
  medalList: MedalItem[]
}

const MedalStatus: React.FC<Props> = (props) => {

  const List = props.medalList.map(data => {
    return (
      <ul key={data.meal_id}>
        <li>{data.meal_name}</li>
        <li>{data.level}</li>
      </ul>
    )
  })
  return (
    <section>{List}</section>
  )
}

export default MedalStatus;