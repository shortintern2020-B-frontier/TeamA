import React from "react";

import Container from '@material-ui/core/Container';

const NotFound: React.FC = () => {

  return (
    <Container maxWidth="xs" style={{ textAlign: 'center' }}>
      <h3>404 Not Found</h3>
      <p>このページは存在しません</p>
    </Container>
  )
}

export default NotFound;