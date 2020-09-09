import React from 'react';

interface Props {
  meal_id: number
  meal_name: string
  count: number
}

const MealList: React.FC<Props> = (props) => {
  const { meal_id, meal_name, count } = props;

  return (
    <ul key={meal_id}>
      <li>料理名：{meal_name}</li>
      <li>回数：{count}</li>
    </ul>
  )
}

export default MealList;