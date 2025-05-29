import { Product } from "@prisma/client";

export type DashBoardCardProps = {
    title: string;
    subtitle: string;
    body: string;
}

export type ProductGridSectionProps = {
    productsFetcher: () => Promise<Product[]>;
    title: string
}

export type ProductCardProps = {
    id: string;
    name: string;
    price: number;
    description: string;
    imagePath: string
}

export type CustomOrderFormProps = {
  product: {
    id: string
    imagePath: string
    name: string
    price: number
    description: string
  }
}

export type Order = {
  id: string;
  createdAt: Date;
  price: number;
  downloadVerificationId: string;
  name: string;
  phone: string;
  measurements: string;
  message?: string;
  product: {
    name: string;
    description: string;
    imagePath: string;
  };
}

export type OrderHistoryEmailProps = {
  orders: Order[];
}

export type OrderReceiptEmailProps = {
  product: {
    name: string
    imagePath: string
    description: string
  }
  order: {
    id: string
    createdAt: Date
    name: string
    phone: string
    measurements: string
    message: string
  }
  downloadVerificationId: string
}


export type OrderInformationProps = {
  order: {
    id: string;
    createdAt: Date;
    name: string;
    phone: string;
    measurements: string;
    message?: string;
  };
  product: {
    imagePath: string;
    name: string;
    description: string;
  };
  downloadVerificationId: string;
}

