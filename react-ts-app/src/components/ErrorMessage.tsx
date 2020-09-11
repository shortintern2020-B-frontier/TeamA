// Kudo

import React from "react";

interface Props {
  message: string | null
}

const ErrorMessage: React.FC<Props> = (props) => {
  const { message } = props
  if (message === null || message === "") {
    return null;
  }
  return <p style={{ color: "red" }}>{message}</p>;
};

export default ErrorMessage;
