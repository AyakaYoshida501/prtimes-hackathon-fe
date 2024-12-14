"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { AudioPlayer } from "../../components/AudioPlayer";

type PodCast = {
  id: number;
  press_release_id: number;
  title: string;
  mp3_url: string;
  uid: string;
};
type PodCasts = PodCast[];

export default function PodCast(): React.ReactElement {
  const [podcast, setPodcast] = useState<PodCasts>([]);
  const fetchPodCasts = async () => {
    try {
      //   const res = await fetch(
      //     "https://article-to-podcast-90199894008.asia-northeast1.run.app/podcasts"
      //   );
      //   if (!res.ok) {
      //     throw new Error("サーバーエラーが発生しました");
      //   }
      //   const data = await res.json();
      //   setPodcast(data);
      const tmpData: PodCasts = [
        {
          id: 1,
          press_release_id: 1,
          title: "新製品発表：次世代スマートフォン",
          mp3_url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          uid: "uid-uid-uid-1",
        },
        {
          id: 2,
          press_release_id: 2,
          title: "年次株主総会開催のお知らせ",
          mp3_url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          uid: "uid-uid-uid-2",
        },
        {
          id: 3,
          press_release_id: 3,
          title: "海外展開：アジア市場への進出",
          mp3_url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          uid: "uid-uid-uid-3",
        },
      ];
      setPodcast(tmpData);
    } catch (e) {
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
          <Card key={p.id} className="m-3">
            <Card.Header>{p.title}</Card.Header>
            <Card.Body>
              <AudioPlayer url={p.mp3_url} title={p.title} />
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
}
