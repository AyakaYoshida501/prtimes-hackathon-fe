"use client";
import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  variant: string;
  text: string;
  callback?: () => void;
};
export default function CustomButton({
  variant = "primary",
  text,
  callback,
}: Props) {
  return (
    <Button className="btn" variant={variant} onClick={callback}>
      {text}
    </Button>
  );
}
