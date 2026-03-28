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

export interface Owner {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}
