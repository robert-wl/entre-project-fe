"use client";
import { FC, useEffect } from "react";

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FC<IProps> = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <h1>Try Again</h1>;
};

export default Error;
