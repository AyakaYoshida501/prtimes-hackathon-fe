export type PressData = {
  id: number;
  uid: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  x_user_name?: string;
};

export type Press = PressData[];
