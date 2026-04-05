export interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface CreateStoryValues {
  title: string;
  categoryId: string;
  article: string;
  image: File | null;
}
