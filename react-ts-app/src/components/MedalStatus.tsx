import React from 'react';

import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
      <TableRow key={data.meal_id}>
        <TableCell>{data.meal_name}</TableCell>
        <TableCell>{data.level}</TableCell>
      </TableRow>
    )
  })
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>バッジ名</TableCell>
          <TableCell>レベル</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {List}
      </TableBody>
    </Table >
  )
}

export default MedalStatus;