export interface Recipe {
  id?: string;
  user_id?: string;
  title: string;
  description: string;
  cooking_time: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  created_at?: string;
}