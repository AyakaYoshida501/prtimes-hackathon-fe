export type PressData = {
  id: number;
  uid: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  sns_url?: string;
};

export type Press = PressData[];
