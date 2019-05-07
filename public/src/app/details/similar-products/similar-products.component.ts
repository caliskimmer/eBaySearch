import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements OnInit {
    @Input() similarProdResults: any;
    prodResultsOriginalOrder: any;
    sortValue: string = 'Default';
    sortType: string = 'Ascending';
    hideResults: boolean = true;

    constructor() { }

    ngOnInit() {
    }

    triggerHideResults() {
        this.hideResults = !this.hideResults;
    }

    setSortType(event) {
        this.sortType = event.target.value;
        let reverse = (this.sortType === 'Descending');
        this.sortResults(reverse);
    }

    setSortValue(event) {
        this.sortValue = event.target.value;
        let reverse = (this.sortType === 'Descending');
        this.sortResults(reverse);
    }

    sortResults(reverse) {
        if (!this.prodResultsOriginalOrder) {
            this.prodResultsOriginalOrder = JSON.parse(JSON.stringify(this.similarProdResults));
        }

        let titleComparator = function(a,b) {
            let res = a.title.localeCompare(b.title);
            return (reverse) ? -res : res;
        }
        let daysLeftComparator = function(a,b) {
            let daysA = parseInt(a.daysLeft);
            let daysB = parseInt(b.daysLeft);
            let res = daysA - daysB;
            return (reverse) ? -res : res;
        }
        let shippingComparator = function(a,b) {
            let shipA = parseFloat(a.shipping.slice(1));
            let shipB = parseFloat(b.shipping.slice(1));
            let res = shipA - shipB;
            return (reverse) ? -res : res;
        }
        let priceComparator = function(a,b) {
            let priceA = parseFloat(a.price.slice(1));
            let priceB = parseFloat(b.price.slice(1));
            let res = priceA - priceB;
            return (reverse) ? -res : res;
        }

        switch(this.sortValue) {
            case 'Default':
                this.similarProdResults = JSON.parse(JSON.stringify(this.prodResultsOriginalOrder));
                break;
            case 'ProductName':
                this.similarProdResults.items.sort(titleComparator);
                break;
            case 'DaysLeft':
                this.similarProdResults.items.sort(daysLeftComparator); 
                break;
            case 'ShippingCost':
                this.similarProdResults.items.sort(shippingComparator);
                break;
            case 'Price':
                this.similarProdResults.items.sort(priceComparator);
                break;
            default:
                break;
        }
    }
}
