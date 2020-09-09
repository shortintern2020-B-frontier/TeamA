import React from 'react';

import MealList from "./MealList"

interface List {
  meal_id: number
  meal_name: string
  count: number
}

interface Props {
  mealLists: List[]
}

const MealLists: React.FC<Props> = (props) => {

  const List = props.mealLists.map(data => {
    return (
      <MealList key={data.meal_id} meal_id={data.meal_id} meal_name={data.meal_name} count={data.count} />
    )
  })
  return (
    <section>{List}</section>
  )
}

export default MealLists;