import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { animations } from './details.animations';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: animations
})
export class DetailsComponent implements OnChanges {
    @Input() itemDetailResults: any;
    @Output() backToMain = new EventEmitter<string>();
    similarProdResults: any;
    searchPhotos: any;

    currentComponent: string = 'Product';

    constructor(private httpClient: HttpClient) { 
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.searchPhotos) {
            this.httpClient.get(`${environment.SERVER_PATH}/search`, {
                params: { 'productTitle': changes.itemDetailResults.currentValue.Title }
            }).subscribe((res) => {
                this.searchPhotos = res;
            });
        }

        if (!this.similarProdResults && this.itemDetailResults) {
            this.httpClient.get(`${environment.SERVER_PATH}/merchandising`, {
                params: { 'itemID': this.itemDetailResults['ItemID'] }
            }).subscribe((res) => {
                this.similarProdResults = res;
            });
        }
    }

    setComponent(component) {
        this.currentComponent = component;
    }

    getStorageItem(key) {
        return localStorage.getItem(key);
    }

    toggleStorage() {
        if (localStorage.getItem(this.itemDetailResults.ItemID)) {
            localStorage.removeItem(this.itemDetailResults.ItemID);
            return;
        }

        let item = {};
        item['id'] = this.itemDetailResults.ItemID;
        if (this.itemDetailResults.Images) {
            item['image'] = this.itemDetailResults.Images[0];
        }
        if (this.itemDetailResults.Title) {
            item['title'] = this.itemDetailResults.Title;
        }
        if (this.itemDetailResults.Price) {
            item['price'] = this.itemDetailResults.Price;
        }
        if (this.itemDetailResults.Seller) {
            item['seller'] = this.itemDetailResults.Seller.Seller;
        }
        if (this.itemDetailResults.Shipping) {
            item['shipping'] = this.itemDetailResults.Shipping;
        }
        if (this.itemDetailResults.ReturnsAccepted) {
            item['returnsAccepted'] = this.itemDetailResults.ReturnsAccepted;
        }

        localStorage.setItem(item['id'], JSON.stringify(item));
    }

    share(url, price, title) {
        let quote = encodeURI(`Buy ${title} at ${price} from link below`);
        let shareURL = `https://www.facebook.com/dialog/share?app_id=${environment.FACEBOOK_APP_ID}&display=popup&href=${url}&quote=${quote}`;
        return shareURL;
    }
}
