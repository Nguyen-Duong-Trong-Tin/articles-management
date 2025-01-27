interface ITour {
  id: number;
  title: string;
  code: string;
  images: string[] | string;
  price: number;
  discount: number;
  information: string;
  schedule: string;
  timeStart: Date;
  stock: number;
  status: string;
  position: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

interface ITourSelect extends ITour {
  newPrice: number;
}

export {
  ITour,
  ITourSelect
};