// import { StoriesResponse } from "./stories";
import { Story } from "./stories";
export interface UsersParams {
  page: number;
  perPage: number;
}

export interface User {
  avatarUrl: string;
  email: string;
  name: string;
  savedStories: string[];
  totalUserStories: number;
  userStories: string[];
  _id: string;
}

export interface UsersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

// export interface UserPublicProfileResponse extends StoriesResponse {
//   user: User;
// }

export interface UserPublicProfileResponse {
  _id: string;
  name: string;
  avatarUrl: string;
  email: string;
  totalUserStories: number;
  userStories: Story[];
  savedStories: string[];
  totalPages?: number;
  currentPage?: number;
}

export interface MovementToFavoritesResponse {
  message: string;
}
