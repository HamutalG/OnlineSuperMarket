export class Product {
    _id;
    name:string;
    category:string;
    quantity:number;
    image:string;
    price:number;

    constructor(name, category, image, price ) {
        this.name = name;
        this.category = category;
        this.image = image;
        this.price = price;
    }
}