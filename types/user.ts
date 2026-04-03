export interface UsersParams {
  page: number;
  perPage: number;
}

export interface User {
  articlesAmount: number;
  avatarUrl: string;
  name: string;
  savedArticles: string[];
  savedStories: string[];
  _id: string;
}

export interface UsersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}
