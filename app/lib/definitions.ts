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
  story: string;
  studio_name: string;
  craft_type: string;
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
  artisan_name?: string;
  avg_rating?: number;
  review_count?: number;
};

export type ArtisanList = {
  id: string;
  name: string;
};

export type ArtisanGrid = {
  id: string;
  name: string;
  image_url: string;
  story?: string;
  studio_name?: string;
  craft_type?: string;
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
