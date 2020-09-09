import React from 'react';

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

interface Props {
  meal_id: number
  meal_name: string
  count: number
}

const MealList: React.FC<Props> = (props) => {
  const { meal_id, meal_name, count } = props;

  return (
    <TableRow key={meal_id}>
      <TableCell>{meal_name}</TableCell>
      <TableCell>{count}</TableCell>
    </TableRow>
  )
}

export default MealList;