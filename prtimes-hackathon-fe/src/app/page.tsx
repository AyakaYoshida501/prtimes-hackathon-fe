"user client";
import React from "react";
import Link from "next/link";
import CustomButton from "../components/CustomButton";
import PressList from "../components/PressList";

export default async function TopPage() {
  const data = await getPressReleases();
  return (
    <main className="m-3">
      <Link href="/podcasts">
        <CustomButton variant="secondary" text="podcastへ" />
      </Link>
      <PressList data={data} />
    </main>
  );
}

async function getPressReleases() {
  const res = await fetch(
    "https://racer-mutual-virtually.ngrok-free.app/press_releases"
  );
  if (!res.ok) {
    throw new Error("サーバーエラーが発生しました");
  }
  return await res.json();
}
