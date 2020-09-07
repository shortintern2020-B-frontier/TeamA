import React from "react";

const ErrorMessage: React.FC = (message) => {
  if (message === null || message === "") {
    return null;
  }
  return <p style={{ color: "red" }}>{message}</p>;
};

export default ErrorMessage;
