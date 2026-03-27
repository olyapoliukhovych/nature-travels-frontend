export interface Card {
  _id: { $oid: string };
  img: string;
  title: string;
  article: string;
  category: { $oid: string };
  rate: number;
}