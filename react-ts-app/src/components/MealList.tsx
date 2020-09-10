import React from 'react';

import Link from "@material-ui/core/Link"
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
      <TableCell><Link style={{ color: '#f4a460' }} href={"https://recipe.rakuten.co.jp/search/" + meal_name}>{meal_name}</Link></TableCell>
      <TableCell>{count}</TableCell>
    </TableRow>
  )
}

export default MealList;