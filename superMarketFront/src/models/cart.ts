import { Product } from "./product";

export class Cart {
    _id;
   customerID:string;
   products:Product[];
   cartDate:string;
   totalPrice:number;
   isClosed:boolean;
}