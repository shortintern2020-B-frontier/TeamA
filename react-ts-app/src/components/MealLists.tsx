// Kudo

import React from 'react';

import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';

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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>料理名</TableCell>
          <TableCell>回数</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{List}</TableBody>
    </Table>
  )
}

export default MealLists;