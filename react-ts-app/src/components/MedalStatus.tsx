import React from 'react';

import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

interface MedalItem {
  level: number;
  meal_id: number;
  meal_name: string;
}

interface Props {
  medalList: MedalItem[];
}


const MedalStatus: React.FC<Props> = (props) => {
  const createMedal = (level: number) => {
    let images = [];
    for (let i = 0; i < level; i++) {
      images.push(<img key={i} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-TpxKKvThVzg%2FUZMs__NN6DI%2FAAAAAAAASMs%2FUzSjOyVbrCA%2Fs800%2Fgold_medal_ribbon2.png&f=1&nofb=1" style={{ height: 30, width: 30 }} />);
    }
    return images;
  }


  const List = props.medalList.map(data => {
    return (
      <TableRow key={data.meal_id}>
        <TableCell>{data.meal_name}</TableCell>
        <TableCell>
          {createMedal(data.level)}
        </TableCell>
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