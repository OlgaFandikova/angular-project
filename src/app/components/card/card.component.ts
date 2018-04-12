import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Product } from '../app.interface';

@Component({
    selector: 'card',
    templateUrl: 'card.template.html',
    styleUrls: ['card.style.scss']
})
export class CardComponent {

    @Input()
    public product: Product;

    @Input()
    public isShowTotal: boolean;

    @Output()
    changeAmount = new EventEmitter<{id: number, increase: boolean}>();

    change(id: number, increase: boolean) {
        this.changeAmount.emit({id, increase});
    }

}