import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
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
            this.updateState(+value[1].getAttribute('data-id'), value[3].id);
        });
        dragulaService.setOptions('catalog', {
            copy: true
        });
    }

    ngOnInit(): void {
        this.getCatalog();
        this.getBasket();
        this.getTotal();
    }

    getCatalog(): void {
        this.appService.getCatalog().subscribe((products: Product[]) => {
            this.products = products;
        });
    }

    getBasket(): void {
        this.appService.getBasket().subscribe((basket: Product[]) => {
            this.basket = basket;
        });
    }

    getTotal(): void {
        this.appService.getTotal().subscribe((total: number) => {
            this.total = total;
        });
    }

    updateState(productId: number, model: string) {
        this.appService.updateState(productId, model);
    }

    changeProductAmount(data: {id: number, increase: boolean}): void {
        this.appService.changeProductAmount(data.id, data.increase);
    }

    changeBasketProductAmount(data: {id: number, increase: boolean}): void {
        this.appService.changeBasketProductAmount(data.id, data.increase);
    }

}
