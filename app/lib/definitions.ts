export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Artisans = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Item = {
  id: string;
  artisan_id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image_url: string;
  status: string;
};

export type ArtisanList = {
  id: string;
  name: string;
};

export type ArtisanGrid = {
  id: string;
  name: string;
  image_url: string;
};

export type Product = {
  id: string; // Will be created on the database
  artisan_id: string;
  title: string;
  price: number; // Stored in cents
  category: string;
  description: string;
  image_url: string;
  status: "available" | "unavailable";
};
