import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
    @Output() getItemDetails = new EventEmitter<string>();
    @Output() deleteWishList = new EventEmitter<string>();
    @Input() selectedItem: string;
    totalShopping: number = 0.0;
    storageItems: any;

    constructor() { }

    ngOnInit() {
    }
    
    removeFromStorage(key) {
        localStorage.removeItem(key);

        // needs to be updated again
        this.storageItems = null;
        this.totalShopping = 0.0;
        this.deleteWishList.emit();
    }

    getStorageSize() {
        return Object.keys(localStorage).length;
    }

    getStorageItems() {
        if (this.storageItems) {
            return this.storageItems;
        }

        let results = [];
        for (let key of Object.keys(localStorage)) {
            let item = JSON.parse(localStorage.getItem(key));

            // If price given, add to total shopping cost
            if (item.price) {
                this.totalShopping += parseFloat(item.price.slice(1));
            }

            results.push(item);
        }

        this.storageItems = results;
        return results;
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
}
