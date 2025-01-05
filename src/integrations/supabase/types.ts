export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ingredients: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity_level: Database["public"]["Enums"]["activity_level"] | null
          allergies: string[] | null
          calorie_intake: number | null
          created_at: string
          diet_type: Database["public"]["Enums"]["diet_type"] | null
          email: string | null
          favorite_cuisines: string[] | null
          id: string
          meals_per_day: number | null
          onboarding_completed: boolean | null
          preferred_cooking_tools: string[] | null
        }
        Insert: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          allergies?: string[] | null
          calorie_intake?: number | null
          created_at?: string
          diet_type?: Database["public"]["Enums"]["diet_type"] | null
          email?: string | null
          favorite_cuisines?: string[] | null
          id: string
          meals_per_day?: number | null
          onboarding_completed?: boolean | null
          preferred_cooking_tools?: string[] | null
        }
        Update: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          allergies?: string[] | null
          calorie_intake?: number | null
          created_at?: string
          diet_type?: Database["public"]["Enums"]["diet_type"] | null
          email?: string | null
          favorite_cuisines?: string[] | null
          id?: string
          meals_per_day?: number | null
          onboarding_completed?: boolean | null
          preferred_cooking_tools?: string[] | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          cooking_time: string
          created_at: string
          description: string | null
          id: string
          ingredients: string[]
          instructions: string[]
          servings: number
          title: string
          user_id: string
        }
        Insert: {
          cooking_time: string
          created_at?: string
          description?: string | null
          id?: string
          ingredients: string[]
          instructions: string[]
          servings: number
          title: string
          user_id: string
        }
        Update: {
          cooking_time?: string
          created_at?: string
          description?: string | null
          id?: string
          ingredients?: string[]
          instructions?: string[]
          servings?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_recipes: {
        Row: {
          cooking_time: string
          created_at: string
          description: string | null
          id: string
          ingredients: string[]
          instructions: string[]
          preferences_considered: string[] | null
          servings: number
          title: string
          user_id: string
        }
        Insert: {
          cooking_time: string
          created_at?: string
          description?: string | null
          id?: string
          ingredients: string[]
          instructions: string[]
          preferences_considered?: string[] | null
          servings: number
          title: string
          user_id: string
        }
        Update: {
          cooking_time?: string
          created_at?: string
          description?: string | null
          id?: string
          ingredients?: string[]
          instructions?: string[]
          preferences_considered?: string[] | null
          servings?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_level:
        | "Sedentary"
        | "Lightly Active"
        | "Moderately Active"
        | "Very Active"
        | "Extremely Active"
      diet_type:
        | "Omnivore"
        | "Vegetarian"
        | "Vegan"
        | "Pescatarian"
        | "Keto"
        | "Paleo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
