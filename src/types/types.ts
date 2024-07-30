export type UserType = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type TrackType = {
  isFavorite?: boolean;
  id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: UserType[];
  onClick: () => void;
};

export type SignupType = {
  email: string;
  username: string;
  userpassword: string;
};

export type SigninType = {
  email: string;
  password: string;
};

export type TokensType = {
  access: string | null;
  refresh: string | null;
};
