import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    @Input() itemDetailResults: any;
    currColor: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    getShippingDetails() {
        let array = [];

        // required for row color alternation to work
        let sellerInfo = this.itemDetailResults['Shipping'];
        if (!sellerInfo) {
            return array;
        }

        if (sellerInfo['type']) {
            array.push(['Shipping Cost', sellerInfo['type']]);
        }
        if (sellerInfo['locations']) {
            let shippingString = '';
            for (let loc of sellerInfo['locations']) {
                shippingString += `${loc},`;
            }
            shippingString = shippingString.slice(0,-1);
            array.push(['Shipping Locations', shippingString]);
        }
        if (sellerInfo['handlingTime']) {
            let handling = sellerInfo['handlingTime'];
            array.push(['Handling Time', (handling == 0 || handling == 1) ? `${handling} Day` : `${handling} Days`]);
        }

        return array;
    }

}
