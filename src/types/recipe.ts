export interface Recipe {
  id?: string;
  title: string;
  description: string;
  cookingTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  user_id?: string;
  created_at?: string;
}