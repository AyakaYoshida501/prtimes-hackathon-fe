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
      <Col>
        {title && <p className="fw-bold mt-3">{title}</p>}
        <Player url={url} controls width="50%" height="90px" />
      </Col>
    </Row>
  );
}
