export type RecipeCategory =
  | "Pasta"
  | "Pizza"
  | "Risotto"
  | "Desserts"
  | "Appetizers"
  | "Main Courses";

export interface Recipe {
  id: string;
  name: string;
  category: RecipeCategory;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  image: string;
}
