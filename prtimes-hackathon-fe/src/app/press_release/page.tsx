"use client";
import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { PressData } from "../../models/press_response";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomButton from "../../components/CustomButton";
import dynamic from "next/dynamic";
import { AudioPlayer } from "../../components/AudioPlayer";

export default function PressRelease() {
  const [press, setPress] = useState<PressData>({
    id: 0,
    uid: "uid-uid-uid-1",
    title: "",
    description: "",
    thumbnailUrl: "",
    x_user_name: "",
  });
  const [podcastUrl, setPodcastUrl] = useState<string>("");

  const makePressRelease = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/pressreleases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: press.title,
          uid: press.uid,
          description: press.description,
          thumbnail: press.thumbnailUrl,
        }),
      });
      if (!res.ok) {
        throw new Error("サーバーエラーが発生しました");
      }
      const data: PressData = await res.json();
      setPress(data);
    } catch (e) {
      alert("入稿に失敗しました");
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPress({ ...press, [e.target.name]: e.target.value });
  };

  const makePodcast = async () => {
    try {
      const res = await fetch(
        "https://article-to-podcast-90199894008.asia-northeast1.run.app/podcasts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            press_id: press.id,
            uid: press.uid,
            article: press.description,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("サーバーエラーが発生しました");
      }
      const data = await res.json();
      setPodcastUrl(data.url);
    } catch (e) {
      alert("登録に失敗しました");
    }
  };

  const uploadMp3 = async (file) => {
    if (file.length === 0) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:3000/mp3", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!res.ok) {
        throw new Error("サーバーエラーが発生しました");
      }
    } catch (e) {
      alert("アップロードに失敗しました");
    }
  };

  return (
    <>
      <Card className="m-3">
        <Card.Header>プレスリリース入稿</Card.Header>
        <Row>
          <Col>
            <Form.Group className="m-3">
              <Form.Label>Xアカウントのユーザー名</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder="ユーザー名を入力"
                value={press.x_user_name}
                onChange={onChange}
              />
            </Form.Group>
            <Form onSubmit={makePressRelease}>
              <Form.Group className="m-3">
                <Form.Label>タイトル</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="タイトル"
                  value={press.title}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label>記事内容</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={5}
                  placeholder="記事内容"
                  value={press.description}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label>サムネイル</Form.Label>
                <Form.Control
                  type="text"
                  name="thumbnailUrl"
                  placeholder="サムネイルURL"
                  value={press.thumbnailUrl}
                  onChange={onChange}
                />
              </Form.Group>
              <Row className="m-3">
                <Col className="d-flex justify-content-center">
                  <CustomButton variant="primary" text="作成する" />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <Card className="m-3">
        <Card.Header>PodCast登録</Card.Header>
        <Row className="m-3">
          <Col>プレスリリースから作成</Col>
          <Col className="d-flex justify-content-end">
            <CustomButton
              variant="primary"
              text="作成"
              callback={makePodcast}
            />
          </Col>
        </Row>
        <Row className="m-3">
          <Col>
            <Form.Group>
              <Form.Label>音声データをアップロードする</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={(e) =>
                  uploadMp3((e.target as HTMLInputElement).files)
                }
              />
            </Form.Group>
          </Col>
          <Col className="d-flex justify-content-end mt-3 mb-3">
            <CustomButton variant="primary" text="作成" />
          </Col>
        </Row>
        <AudioPlayer
          url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          title="作成されたポッドキャスト"
        />
      </Card>
    </>
  );
}
