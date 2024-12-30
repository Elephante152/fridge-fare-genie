export interface Recipe {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  cookingTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  created_at?: string;
}