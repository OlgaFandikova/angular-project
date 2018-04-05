import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app',
  templateUrl: 'app.template.html',
  styleUrls: ['app.style.css']
})
export class AppComponent {

    public products = [{
      id: 1,
      name: 'Название товара',
      description: 'Краткое описание товара со всеми его прелестями',
      img: '',
      amount: 1,
      total: 8,
      price: 210,
    }, {
      id: 2,
      name: 'Название товара',
      description: 'Краткое описание товара со всеми его прелестями',
      img: '',
      amount: 1,
      total: 8,
      price: 210,
    }];

    public bag = [];

    public constructor(private dragulaService:DragulaService) {
        dragulaService.dropModel.subscribe(() => {
            this.onDropModel();
        });
    }

    private onDropModel() {
        console.log(this.products, this.bag);
    }

}
