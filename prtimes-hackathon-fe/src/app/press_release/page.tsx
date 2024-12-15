"use client";
import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { PressData } from "../../models/press_response";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomButton from "../../components/CustomButton";
import { AudioPlayer } from "../../components/AudioPlayer";

export default function PressRelease() {
  const [press, setPress] = useState<PressData>({
    id: 0,
    uid: "uid-uid-uid-1",
    title: "",
    description: "",
    image: "",
    sns_url: "",
  });
  const [podcastUrl, setPodcastUrl] = useState<string>("");

  const makePressRelease = async () => {
    try {
      const res = await fetch(
        "https://racer-mutual-virtually.ngrok-free.app/press_releases",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: press.title,
            description: press.description,
            sns_url: press.sns_url,
            uid: press.uid,
            image: [press.image],
          }),
        }
      );
      if (!res.ok) {
        console.log(res);
        throw new Error("サーバーエラーが発生しました");
      }
      const data: PressData = await res.json();
      setPress(data);
    } catch (e) {
      console.error(e);
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
      console.error(e);
      alert("登録に失敗しました");
    }
  };

  const uploadMp3 = async (file: File) => {
    if (!file) {
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
      console.error(e);
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
              <Form.Label>Xの投稿URL</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder="投稿URL"
                value={press.sns_url}
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
                  value={press.image}
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
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    uploadMp3(files[0]);
                  }
                }}
              />
            </Form.Group>
          </Col>
          <Col className="d-flex justify-content-end mt-3 mb-3">
            <CustomButton variant="primary" text="作成" />
          </Col>
        </Row>
        <AudioPlayer url={podcastUrl} title="作成されたポッドキャスト" />
      </Card>
    </>
  );
}
