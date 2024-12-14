"use client";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PressData } from "../../../models/press_response";
import Image from "../../../components/Image";

export default function PressDetail() {
  const [press, setPress] = useState<PressData>();
  const params = useParams();
  const id = params.id;
  const getPressReleases = async () => {
    try {
      //   const res = await fetch(`http://localhost:3000/api/pressreleases/${id}`);
      //   if (!res.ok) {
      //     throw new Error("サーバーエラーが発生しました");
      //   }
      //   const data = await res.json();
      const tmpData: PressData = {
        id: Number(id),
        uid: "uid-uid-uid-1",
        title: "新製品発表：次世代スマートフォン",
        description:
          "全体的には、例えばスティールランキング1位の富山に対して、ターンオーバーが多く出てしまった点は、明日に向けての反省点として挙げられます。その中で、ペイントエリアでの得点が多い富山の強力なインサイド陣に対して、スミス選手やバーレル選手が上手に守りながら、しっかりと抑え込むことが出来たことは非常に良かったです。\nディフェンス面全般でも、トーマス・ケネディ選手に連続3Pシュートを決められましたが、かなり頑張って出来ていると思って評価しています。\n明日の試合は、もう少し彼の部分はケアしたいと思うので、スイッチ時のディフェンスも含めて、修正して臨みたいと思っています。\n富山は、ほんとうに懐かしいところで、たくさんのブースターに声をかけられましたし、たくさんのお客さんがいて雰囲気がすごく良い場所です。こういう雰囲気の中でゲームができて嬉しかったですし、チームとしても、僕とスミス選手、アシスタントコーチの福島コーチも以前、富山でヘッドコーチをしていましたし、中村選手も特別指定選手でいましたし、ブラウン選手や橋本選手もいて、富山にゆかりのある選手が福岡にはたくさんいます。富山の選手にも知っている顔がたくさんいて、みんな声かけてくれたのが嬉しかったです。",
        thumbnailUrl: "https://www.lettuceclub.net/i/N1/1062998/10607123.jpg",
      };
      //   setPress(data);
      setPress(tmpData);
    } catch (e) {
      alert("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    getPressReleases();
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
              src={press.thumbnailUrl}
              alt={press.thumbnailUrl}
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
    </Row>
  );
}
