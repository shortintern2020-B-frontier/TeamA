// Kudo

import React from 'react';

import Button from '@material-ui/core/Button';

interface Props {
  onClick: any
}

const LogoutButton: React.FC<Props> = (props) => {
  const { onClick } = props

  return <Button onClick={onClick}>Logout</Button>
}

export default LogoutButton