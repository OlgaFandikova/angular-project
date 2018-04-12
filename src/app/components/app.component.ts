import {Component} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { find, findIndex } from 'lodash';
import { Product } from './app.interface';
import { AppService } from './app.service';

@Component({
    selector: 'app',
    templateUrl: 'app.template.html',
    styleUrls: ['app.style.scss'],
    providers: [AppService]
})
export class AppComponent {

    public products: Product[];
    public basket: Product[];
    public total: number;

    public constructor(private appService: AppService, private dragulaService: DragulaService) {
        dragulaService.drop.subscribe((value) => {
            this.updateState(+value[1].getAttribute('data-id'), value[2] ? value[2].id : '');
        });
        dragulaService.setOptions('catalog', {
            copy: true
        });
    }

    ngOnInit(): void {
        this.products = this.appService.getCatalog();
        this.basket = this.appService.getBasket();
    }

    updateState(productId: number, model: string) {
        if (model == 'basket') {
            let basket = [...this.basket];
            const index = findIndex(this.basket, {id: productId});
            const product = find(this.products, {id: productId});

            if (basket[index]) {
                basket[index].amount += product.amount;

                if (basket[index].amount > product.total) basket[index].amount = product.total;

                this.basket = [...basket];
            }

            setTimeout(() => this.calcTotal(), 0);
        } else {
            this.products = [...this.products];
        }
    }

    changeAmount(data: {id: number, increase: boolean}): void {
        this.appService.changeAmount(data.id, data.increase);
    }

    calcTotal(): void {
        let total: number = 0;

        this.basket.map((product: Product) => {
            total += product.amount * product.price
        });

        this.total = total
    }

}
