import { useEffect, useState } from "react";

type TextLogProps = {
  msg: string;
  logMsg: string;
};

const TextLog = ({ msg, logMsg }: TextLogProps) => {
  const [message, setMessage] = useState(msg);
  const [logMessage, setLogMessage] = useState(logMsg);

  useEffect(() => console.log(logMessage), []);

  return <span>{message}</span>;
};

export default TextLog;
