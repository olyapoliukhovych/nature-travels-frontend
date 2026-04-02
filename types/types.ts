// export interface Story {
//   article: string;
//   category: Category;
//   date: string;
//   img: string;
//   ownerId: Owner;
//   rate: number;
//   title: string;
//   _id: string;
//   favoritesCount: number;
// }

// interface Category {
//   _id: string;
//   category: string;
// }

// interface Owner {
//   _id: string;
//   name: string;
// }

export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  date: string;
  rate: number;
  favoritesCount: number;
  categoryId: string;
  ownerId: string;
}

export interface Category {
  _id: string;
  category: string;
}

export interface User {
  _id: { $oid: string };
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  // savedArticles?: string[];
  stories?: number;
  savedStories?: string[];
}

export interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}
