export type PriceHistoryItem = {
  price: number;
};

export type User = {
  email: string;
};

export type Product = {
  _id?: string;
  ProductUrl: string;
  Currency: string;
  image: string;
  name: string;
  currentPrice: number;

  discount: number;

  isOutOfStock: Boolean;
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  name: string;
  ProductUrl: string;
  currentPrice: number;
};
