import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { find, findIndex, reject } from 'lodash';
import { Product } from './app.interface';
import { CATALOG } from './app.catalog'

@Injectable()
export class AppService {

    public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(CATALOG);
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
            const basketProduct = basket[index];

            if (basketProduct) {
                if (basketProduct.amount > product.total) {
                    basketProduct.amount = product.total;
                } else {
                    basketProduct.amount += product.amount;
                }

                this.basket$.next(basket);

                this.calcTotal();
            }
        } else {
            // basket = reject(basket, {id: productId});
            //
            // this.basket$.next(basket);
        }

        this.products$.next(products);

        this.calcTotal();
    }

    calcTotal = () => setTimeout(() => {
        let total: number = 0;

        this.basket$.value.map((product: Product) => {
            total += product.amount * product.price
        });

        this.total$.next(total);
    }, 0);

    changeProductAmount(id: number, increase: boolean): void {
        const products = this.calcProductsAmount(id, increase, this.products$.value);

        this.products$.next(products);
    }

    changeBasketProductAmount(id: number, increase: boolean): void {
        const basket = this.calcProductsAmount(id, increase, this.basket$.value);

        this.basket$.next(basket);

        this.calcTotal();
    }

    deleteProduct(id: number): void {
        const basket = reject(this.basket$.value, {id: id});

        this.basket$.next(basket);

        this.calcTotal();
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