"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("react-player"), { ssr: false });

type Props = {
  url: string;
  title?: string;
  className?: string;
};

export function AudioPlayer({ url, title, className = "m-3" }: Props) {
  return (
    <Row className={className}>
      {title && <p className="fw-bold mt-3">{title}</p>}
      <Col className="w-100 d-flex justify-content-center">
        <Player url={url} controls width="100%" height="90px" />
      </Col>
    </Row>
  );
}
