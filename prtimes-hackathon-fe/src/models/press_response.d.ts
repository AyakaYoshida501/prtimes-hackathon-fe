export type PressData = {
  id: number;
  uid: string;
  title: string;
  description: string;
  image: string;
  sns_url?: string;
};

export type Press = PressData[];
