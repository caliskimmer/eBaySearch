import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    @Input() searchResults: any;
    @Input() selectedItem: any;
    @Output() getItemDetails = new EventEmitter<string>();
    page: number = 1;
    pageSize: number = 10;

    constructor() {
    }

    ngOnInit() {
    }

    truncate(text) {
        if (text.length <= 35) {
            return text;
        }

        text = text.substring(0, 35);
        if (text.slice(-1) === ' ') {
            text += ' ...';
            return text;
        }

        text = text.substring(0, text.lastIndexOf(' '));
        text += ' ...';
        return text;
    }

    switchToDetail(detailsToPass) {
        this.getItemDetails.emit(detailsToPass);
    }

    getStorageItem(key) {
        return localStorage.getItem(key);
    }

    toggleStorage(itemIndex) {
        let result = this.searchResults.results[itemIndex];

        if (localStorage.getItem(result.id)) {
            localStorage.removeItem(result.id);
            return;
        }

        let item = {};
        item['id'] = result.id;
        if (result.image) {
            item['image'] = result.image;
        }
        if (result.title) {
            item['title'] = result.title;
        }
        if (result.price) {
            item['price'] = result.price;
        }
        if (result.seller) {
            item['seller'] = result.seller;
        }
        if (result.shipping) {
            item['shipping'] = result.shipping;
        }
        if (result.returnsAccepted) {
            item['returnsAccepted'] = result.returnsAccepted;
        }

        localStorage.setItem(item['id'], JSON.stringify(item));
    }
}
