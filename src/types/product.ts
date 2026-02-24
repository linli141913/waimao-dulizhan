export interface ProductSpecs {
  dimensions: string;
  weight: string;
  material: string;
  color: string[];
  moq: string;
  leadTime: string;
  packaging: string;
}

export interface Product {
  id: string;
  category: string;
  images: string[];
  model3d?: string;
  drawing2d?: string;
  specs: ProductSpecs;
  features: string[];
  createdAt: string;
}
