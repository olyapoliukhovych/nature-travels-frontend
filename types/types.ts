export interface Story {
  article: string;
  category: Category;
  date: string;
  img: string;
  ownerId: string;
  rate: number;
  title: string;
  _id: string;
}

export interface Category {
  _id: string;
  category: string;
}
