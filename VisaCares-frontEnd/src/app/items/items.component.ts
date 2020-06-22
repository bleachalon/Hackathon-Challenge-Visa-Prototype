import {Component, Input, OnInit} from '@angular/core';

class Item{
  name = '';
  price = 0;
  image = '';

  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('item') data: Item;
}

@Component({
  selector: 'app-items',
  template: `
    <item *ngFor="let i of items" [item]="i"></item>
  `,
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  constructor() {
    this.items = [
      new Item('Nike Shoes!', 59.99, 'https://vader-prod.s3.amazonaws.com/1571073339-peg36-1571073314.jpg'),
      new Item('Brand New PS5', 599.99, 'https://i.gadgets360cdn.com/large/ps5_digital_edition_1591912834512.jpeg'),
      new Item('New York Knicks Tickets', 0.99, 'https://sep.yimg.com/ay/yhst-52442162199817/12-custom-new-york-knicks-birthday-party-ticket-invitations-with-optional-photo-1.jpg')
    ];
  }

  ngOnInit(): void {
  }

}
