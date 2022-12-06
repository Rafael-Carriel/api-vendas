import AppError from "@shared/errors/appError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";

interface IRequest{
    id: string;
    name : string;
    price : number;
    quantity : number;
}

export default class UpdateProductService{
    public async execute({id, name, price, quantity} : IRequest) : Promise<Product>{
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne(id);
        if(!product){
            throw new AppError('PRODUCT NOT FOUND.');
        }

        const productExists = await productRepository.findByName(name);
        if(productExists && product.name){
            throw new AppError('There is already onde product' + 'with this name')
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }
}