import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { find, findIndex } from 'lodash';

@Component({
  selector: 'app',
  templateUrl: 'app.template.html',
  styleUrls: ['app.style.scss']
})
export class AppComponent {

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
    }];

    public bag = [];

    public constructor(dragulaService: DragulaService) {
        // dragulaService.dropModel.subscribe(() => {
        //     this.onDropModel();
        // });

        // this.products = [...this.catalog];

        dragulaService.drop.subscribe((value) => {
            this.updateState(+value[1].id, value[2] ? value[2].id : '');
        });
        dragulaService.setOptions('catalog', {
            copy: true,
            // accepts: function (value) {
            //     return false;
            // },
            // moves: function (el, source, handle, sibling) {
            //     console.log('moves');
            //     return true; // elements are always draggable by default
            // }
        });

    }

    // private onDropModel() {
    //     // console.log(this.products, this.bag);
    // }

    updateState(productId: number, model: string) {
        if (model == 'bag') {
            const product = find(this.bag, {id: productId});

            if (product) {
                let bag = [...this.bag];
                const index = findIndex(this.bag, {id: productId});

                bag[index].amount++;

                this.bag = [...bag];
            }
        } else {
            this.products = [...this.products];
        }
    }

}
