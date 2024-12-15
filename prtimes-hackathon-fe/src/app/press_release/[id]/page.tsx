"use client";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PressData } from "../../../models/press_response";
import { PodCast } from "../../../models/podcast_response";
import Image from "../../../components/Image";
import { AudioPlayer } from "../../../components/AudioPlayer";

export default function PressDetail() {
  const [press, setPress] = useState<PressData>();
  const [podCast, setPodCast] = useState<PodCast>();
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        const id = params.id;
        const pressData = await fetch(
          `https://racer-mutual-virtually.ngrok-free.app/press_releases/${id}`,
          {
            method: "GET",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        );
        if (!pressData.ok) {
          throw new Error("サーバーエラーが発生しました");
        }
        const press = await pressData.json();
        setPress(press);

        const podcastRes = await fetch(
          `https://article-to-podcast-90199894008.asia-northeast1.run.app/podcasts/${id}`
        );
        if (!podcastRes.ok) {
          throw new Error("podcast取得時にサーバーエラーが発生しました");
        }
        const podcast = await podcastRes.json();
        setPodCast(podcast[0]);
      } catch (e) {
        console.error(e);
        alert("データの取得に失敗しました");
      }
    })();
  }, []);

  if (!press) {
    return <div>Loading...</div>;
  }
  return (
    <Row className="mx-auto" style={{ width: "60%" }}>
      <Col className="w-100">
        <p className="text-center fw-bold mt-3" style={{ fontSize: "1.2em" }}>
          {press.title}
        </p>
        <Row>
          <Col>
            <Image
              className="mb-3"
              src={press.image[0]}
              alt={press.image[0]}
              width="100%"
            />
          </Col>
        </Row>
        {press.description.split("\n").map((line, index) => (
          <p key={index} className="lh-base">
            {line}
          </p>
        ))}
      </Col>
      {podCast?.summary && <p className="fw-bold mt-3">{podCast.summary}</p>}
      <AudioPlayer url={podCast ? podCast.audio_url : ""} className="mb-3" />
    </Row>
  );
}
