"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Row, Col } from "react-bootstrap";
import CustomButton from "./CustomButton";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const path = usePathname();
  return (
    <header className="bg-blue">
      <Row className="p-3 mb-2 bg-primary text-white">
        <Col>
          <Link href="/" className="text-decoration-none text-white font-bold ">
            PR TIMES
          </Link>
        </Col>
        {path === "/" && (
          <Col className="d-flex justify-content-end">
            <Link href="/press_release">
              <CustomButton variant="light" text="入稿する" />
            </Link>
          </Col>
        )}
      </Row>
    </header>
  );
}
