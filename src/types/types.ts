export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type FullOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: User;
  images: [string];
  maxAdults: number;
}

export type Offers = Offer[];

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type Comments = Comment[];

export type Point = {
  id: string;
  latitude: number;
  longitude: number;
  zoom: number;
}
