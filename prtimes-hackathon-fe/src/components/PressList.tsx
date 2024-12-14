"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

type Press = {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
};
type Props = {
  data: Press[];
};

export default function PressList({ data }: Props): React.ReactElement {
  const router = useRouter();
  const jump = (id: number) => {
    router.push(`/press_release/${id}`);
  };

  const makeDescription = (description: string) => {
    if (description.length > 30) {
      return description.slice(0, 30) + "...";
    }
    return description;
  };
  return (
    <Row>
      {data.map((d) => (
        <Col key={d.id} md={4} className="mb-3" onClick={() => jump(d.id)}>
          <Card>
            <Card.Img variant="top" src={d.thumbnailUrl} />
            <Card.Body>
              <Card.Title className="fs-6 fw-bold">{d.title}</Card.Title>
              <Card.Text>{makeDescription(d.description)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
