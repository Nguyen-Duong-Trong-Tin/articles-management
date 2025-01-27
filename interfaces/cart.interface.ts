import { ITour } from "./tour.interface";

interface ICart {
  tourId: number | ITour,
  quantity: number
};

interface ICartSelect extends ICart {
  tour: ITour
}

export {
  ICart,
  ICartSelect
};