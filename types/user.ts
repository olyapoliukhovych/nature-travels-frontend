export interface UsersParams {
  page: number;
  perPage: number;
}

export interface UserPublic {
  avatarUrl: string;
  name: string;
  savedStories: string[];
  totalUserStories: number;
  userStories: string[];
  _id: string;
}

export interface UserPrivate extends UserPublic {
  email: string;
}

export interface UsersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: UserPublic[];
}

export interface MovementToFavoritesResponse {
  message: string;
}
