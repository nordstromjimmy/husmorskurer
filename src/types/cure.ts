export type Cure = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  ingredients: string[];
  instructions: string[];
  prep_time?: string;
  difficulty?: string;
  categories: string[];
  tags: string[];
  evidence_level: "folklore" | "some_research" | "well_researched";
  warnings: string[];
  image_url?: string;
  alt_text?: string;
};

export type CurePreview = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  image_url?: string;
  categories: string[];
  tags: string[];
  isFavorite: boolean;
};
