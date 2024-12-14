"user client";
import React from "react";
import Link from "next/link";
import CustomButton from "../components/CustomButton";
import PressList from "../components/PressList";

export default async function TopPage() {
  const data = await getPressReleases();
  return (
    <>
      <Link href="/podcasts">
        <CustomButton variant="secondary" text="podcastへ" />
      </Link>
      <div>top page</div>
      <PressList data={data} />
    </>
  );
}

async function getPressReleases() {
  //　仮データ
  return [
    {
      id: 1,
      title: "新製品発表：次世代スマートフォン",
      description:
        "2023年6月1日に新発売されるスマートフォンについてのお知らせです。記事詳細記事詳細記事詳細記事詳細",
      thumbnailUrl: "",
    },
    {
      id: 2,
      title: "年次株主総会開催のお知らせ",
      description:
        "2023年5月15日に開催される株主総会についてのお知らせです。記事詳細記事詳細記事詳細記事詳細",
      thumbnailUrl: "",
    },
    {
      id: 3,
      title: "海外展開：アジア市場への進出",
      description:
        "2023年4月1日にアジア市場への進出についてのお知らせです。記事詳細記事詳細記事詳細記事詳細",
      thumbnailUrl: "",
    },
    {
      id: 4,
      title: "新製品発表：次世代スマートフォン",
      description:
        "2023年6月1日に新発売されるスマートフォンについてのお知らせです。記事詳細記事詳細記事詳細記事詳細",
      thumbnailUrl: "",
    },
    {
      id: 5,
      title: "年次株主総会開催のお知らせ",
      description:
        "2023年5月15日に開催される株主総会についてのお知らせです。記事詳細記事詳細記事詳細記事詳細",
      thumbnailUrl: "",
    },
    {
      id: 6,
      title: "海外展開：アジア市場への進出",
      description:
        "2023年4月1日にアジア市場への進出についてのお知らせです。記事詳細記事詳細記事詳細記事詳細",
      thumbnailUrl: "",
    },
    // 他のプレスリリースを追加...
  ];
}
