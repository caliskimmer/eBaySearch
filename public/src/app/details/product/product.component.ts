import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [NgbCarouselConfig]
})
export class ProductComponent implements OnInit {
    @Input() itemDetailResults: any;

    constructor(private modal: NgbModal, private carouselConfig: NgbCarouselConfig) {
        carouselConfig.showNavigationIndicators = false;
        carouselConfig.interval = 0;
    }

    ngOnInit() {
    }

    getItemDetails() {
        let array = [];

        // required for row color alternation to work
        if (this.itemDetailResults['Subtitle']) {
            array.push(['Subtitle', this.itemDetailResults['Subtitle']]);
        }
        if (this.itemDetailResults['Price']) {
            array.push(['Price', this.itemDetailResults['Price']]);
        }
        array.push(['Location', this.itemDetailResults['Location']]);
        if (this.itemDetailResults['ReturnPolicy']) {
            array.push(['Return Policy', this.itemDetailResults['ReturnPolicy']]);
        }
        for (let item of this.itemDetailResults['Other']) {
            array.push([item['Name'], item['Value']]);
        }

        return array;
    }

    open(contents) {
        this.modal.open(contents, {windowClass: 'modal-window'});
    }
}
