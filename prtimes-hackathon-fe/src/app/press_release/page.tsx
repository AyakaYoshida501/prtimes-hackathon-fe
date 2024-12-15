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
    _id: "",
    id: 0,
    uid: "",
    title: "",
    description: "",
    image: "",
    sns_url: "",
  });
  const [podcastUrl, setPodcastUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPodcastLoading, setIsPodcastLoading] = useState<boolean>(false);
  const makePressRelease = async () => {
    try {
      setIsLoading(true);
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
            uid: "uuid1",
            image: [press.image],
          }),
        }
      );
      if (!res.ok) {
        throw new Error("サーバーエラーが発生しました");
      }
      const data: PressData = await res.json();
      setPress(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      alert("入稿に失敗しました");
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPress({ ...press, [e.target.name]: e.target.value });
  };
  const dropUnnecessary = (description: string) => {
    const ret = description
      .replace(/\r?\n/g, "")
      .replace(/\s+/g, "")
      .replace(/【[^】]*】/g, "");
    console.log("ret", ret);
    return ret;
  };

  const makePodcast = async () => {
    setIsPodcastLoading(true);
    try {
      const res = await fetch(
        "https://article-to-podcast-90199894008.asia-northeast1.run.app/podcasts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            press_id: press._id,
            uid: press.uid,
            article: dropUnnecessary(press.description),
          }),
        }
      );
      if (!res.ok) {
        throw new Error("サーバーエラーが発生しました");
      }
      const data = await res.json();
      setPodcastUrl(data.audio_url);
      setIsPodcastLoading(false);
    } catch (e) {
      console.error(e);
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      <Card className="m-3">
        <Card.Header>プレスリリース入稿</Card.Header>
        <Row>
          <Col>
            <Form>
              <Form.Group className="m-3">
                <Form.Label>Xの投稿URL</Form.Label>
                <Form.Control
                  type="text"
                  name="sns_url"
                  placeholder="投稿URL"
                  value={press.sns_url}
                  onChange={onChange}
                />
              </Form.Group>
              {isLoading && (
                <Row>
                  <Col>
                    <div>Loading...</div>
                  </Col>
                </Row>
              )}
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
                  rows={10}
                  placeholder="記事内容"
                  value={press.description}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label>サムネイル</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="サムネイルURL"
                  value={press.image[0]}
                  onChange={onChange}
                />
              </Form.Group>
              <Row className="m-3">
                <Col className="d-flex justify-content-center">
                  <CustomButton
                    variant="primary"
                    text="作成する"
                    callback={makePressRelease}
                  />
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
          {isPodcastLoading && (
            <Row>
              <Col>
                <div>Loading...</div>
              </Col>
            </Row>
          )}
          <Col className="d-flex justify-content-end">
            <CustomButton
              variant="primary"
              text="作成"
              callback={makePodcast}
            />
          </Col>
        </Row>
        <AudioPlayer url={podcastUrl} title="作成されたポッドキャスト" />
      </Card>
    </>
  );
}
