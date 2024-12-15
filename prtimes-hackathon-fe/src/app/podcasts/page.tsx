"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { AudioPlayer } from "../../components/AudioPlayer";
import { PodCasts } from "../../models/podcast_response";

export default function PodCast(): React.ReactElement {
  const [podcast, setPodcast] = useState<PodCasts>([]);
  const fetchPodCasts = async () => {
    try {
      const res = await fetch(
        "https://article-to-podcast-90199894008.asia-northeast1.run.app/podcasts",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("サーバーエラーが発生しました");
      }
      const data = await res.json();
      setPodcast(data);
    } catch (e) {
      console.error(e);
      alert("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    fetchPodCasts();
  }, []);
  return (
    <Row className="mx-auto" style={{ width: "60%" }}>
      <Col className="w-100 text-center">
        {podcast.map((p) => (
          <Card key={p.press_id} className="m-3">
            <Card.Header>{p.title}</Card.Header>
            <Card.Body>
              <AudioPlayer url={p.audio_url} title={p.title} />
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
}
