"use client";
import React from "react";
import { Row, Col, Card, Ratio } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

type Press = {
  id: number;
  _id?: number;
  title: string;
  description: string;
  image: string;
};
type Props = {
  data: Press[];
};

export default function PressList({ data }: Props): React.ReactElement {
  const router = useRouter();
  const jump = (id: number) => {
    if (!id) return;
    router.push(`/press_release/${id}`);
  };

  const makeDescription = (description: string) => {
    if (description.length > 30) {
      return description.slice(0, 30) + "...";
    }
    return description;
  };
  const makeTitle = (title: string) => {
    if (title.length > 15) {
      return title.slice(0, 15) + "...";
    }
    return title;
  };
  return (
    <Row>
      {data.map((d) => (
        <Col
          key={d._id}
          md={4}
          className="mb-3 col-4"
          onClick={() => jump(d._id ? d._id : d.id)}
        >
          <Card>
            <Ratio aspectRatio="16x9">
              <Card.Img
                variant="top"
                src={d.image[1] ? d.image[1] : d.image[0]}
              />
            </Ratio>
            <Card.Body>
              <Card.Title className="fs-6 fw-bold">
                {makeTitle(d.title)}
              </Card.Title>
              <Card.Text>{makeDescription(d.description)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
