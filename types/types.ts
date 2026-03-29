export interface Story {
  article: string;
  category: Category;
  date: string;
  img: string;
  ownerId: Owner;
  rate: number;
  title: string;
  _id: string;
  favoritesCount: number;
}

interface Category {
  _id: string;
  category: string;
}

interface Owner {
  _id: string;
  name: string;
}
