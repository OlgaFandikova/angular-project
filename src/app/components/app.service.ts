import { Injectable } from '@angular/core';
import { findIndex } from 'lodash';
import {Product} from './app.interface'

@Injectable()
export class AppService {

    public products = [{
        id: 1,
        name: 'Название товара 1',
        description: 'Краткое описание товара со всеми его прелестями',
        img: 'assets/img/item-1.jpg',
        amount: 1,
        total: 8,
        price: 210,
    }, {
        id: 2,
        name: 'Название товара 2',
        description: 'Краткое описание товара со всеми его прелестями',
        img: 'assets/img/item-2.jpg',
        amount: 1,
        total: 8,
        price: 210,
    }] as Product[];

    public basket = [] as Product[];

    getCatalog(): Product[] {
        return this.products
    }

    getBasket(): Product[] {
        return this.basket
    }

    changeAmount(id: number, increase: boolean): void {
        this.products = this.calcProductsAmount(id, increase, this.products);
        this.basket = this.calcProductsAmount(id, increase, this.basket);
    }

    calcProductsAmount(id: number, increase: boolean, products: Product[]): Product[] {
        const index = findIndex(products, {id: id});

        if (products[index]) {
            if (increase && products[index].amount < products[index].total) {
                products[index].amount++;
            } else if (!increase && products[index].amount > 1) {
                products[index].amount--;
            }
        }

        return products;
    }

}