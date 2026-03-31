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

export interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}
