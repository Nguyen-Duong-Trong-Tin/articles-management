interface ICategory {
  id: number;
  title: string;
  image: string;
  description: string;
  status: string;
  position: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export { ICategory };