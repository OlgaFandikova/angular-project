import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { find, findIndex, reject } from 'lodash';
import { Product } from './app.interface';

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

    public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products);
    public basket$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([] as Product[]);
    public total$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    getCatalog(): Observable<Product[]> {
        return this.products$.asObservable();
    }

    getBasket(): Observable<Product[]> {
        return this.basket$.asObservable();
    }

    getTotal(): Observable<number> {
        return this.total$.asObservable();
    }

    updateState(productId: number, model: string): void {
        let products = [...this.products$.value];
        let basket = [...this.basket$.value];

        if (model == 'products') {
            const index = findIndex(basket, {id: productId});
            const product = find(products, {id: productId});

            if (basket[index]) {
                basket[index].amount += product.amount;

                if (basket[index].amount > product.total) basket[index].amount = product.total;
            } else {
                basket.push(product);
            }
        } else {
            basket = reject(basket, {id: productId});
        }

        this.products$.next(products);
        this.basket$.next(basket);

        this.calcTotal(basket);
    }

    calcTotal(basket: Product[]): void {
        let total: number = 0;

        basket.map((product: Product) => {
            total += product.amount * product.price
        });

        this.total$.next(total);
    }

    changeProductAmount(id: number, increase: boolean): void {
        const products = this.calcProductsAmount(id, increase, this.products$.value);

        this.products$.next(products);
    }

    changeBasketProductAmount(id: number, increase: boolean): void {
        const basket = this.calcProductsAmount(id, increase, this.basket$.value);

        this.basket$.next(basket);

        this.calcTotal(basket);
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