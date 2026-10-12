export type Ingredient = {
  id: string;
  amount: string;
  item: string;
};

export type Recipe = {
  id: string;
  title: string;
  note: string;
  servings: string;
  time: string;
  ingredients: Ingredient[];
  steps: string[];
  photo: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

export type Settings = {
  googleConnected: boolean;
};
