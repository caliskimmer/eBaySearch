import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { animations } from './search-form.animations';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
    animations: animations
})
export class SearchFormComponent implements OnInit {
    ipUrl: string = 'http://ip-api.com/json';
    keywordInput: string = '';
    locRadio: string = 'location-current';
    categoryInput: string = '';
    otherInputText: string = '';
    postal: string = '';
    autocompleteResults: any;

    resTabActive: boolean = true;
    wishlistTabActive: boolean = false;
    detailTabActive: boolean = false;
    isAnimating: boolean = false;
    isSubmitted: boolean = false;
    searchResults: any;
    wishlistSelectedItem: any = {'id': null};
    resultsSelectedItem: any = {'id': null};
    itemDetailResults: any;
    @ViewChild('wlbtn') wishlistBtn: ElementRef;
    @ViewChild('resbtn') resBtn: ElementRef;
    @ViewChild('searchForm') searchForm: NgForm;

    constructor(private renderer: Renderer2, private httpClient: HttpClient) { 
    }

    ngOnInit() {
        this.httpClient.get(this.ipUrl).subscribe((res) => {
            this.postal = res['zip'];
        });
    }

    validateKeyword() {
        if (/\S/.test(this.keywordInput)) {
            return true;
        }

        if (this.searchForm.form.controls['keywordInput']) {
            this.searchForm.form.controls['keywordInput'].setErrors({'invalid': true});
        }

        return false;
    }

    validateZip() {
        if (/^\d{5}$/.test(this.otherInputText)) {
            return true;
        }

        if (this.searchForm.form.controls['otherLocInput']) {
            this.searchForm.form.controls['otherLocInput'].setErrors({'invalid': true});
        }

        return false;
    }

    autocompleteZip(zip) {
        this.autocompleteResults = [];

        if (zip === '') {
            return this.autocompleteResults;
        }

        let params = {
            'zip': zip
        };
        this.httpClient.get(`${environment.SERVER_PATH}/search/postal`, {
            params: params
        }).subscribe((res) => {
            if (res['results']) {
                this.autocompleteResults = res['results'];
            }
        });

        return this.autocompleteResults;
    }


    currentLocationIsEnabled() {
        if (this.locRadio === 'location-current') {
            return true;
        }

        return false;
    }

    toggleAnimating($event) {
        this.isAnimating = !this.isAnimating;
    }

    toggleResults(listType) {
        if (listType === 'wishlist') {
            this.renderer.setStyle(this.wishlistBtn.nativeElement, 'background-color', 'black');
            this.renderer.setStyle(this.wishlistBtn.nativeElement, 'color', 'white');
            this.renderer.setStyle(this.resBtn.nativeElement, 'background-color', 'white');
            this.renderer.setStyle(this.resBtn.nativeElement, 'color', 'black');
            this.resTabActive = false;
            this.wishlistTabActive = true;
            this.detailTabActive = false;
        } else {
            this.renderer.setStyle(this.resBtn.nativeElement, 'background-color', 'black');
            this.renderer.setStyle(this.resBtn.nativeElement, 'color', 'white');
            this.renderer.setStyle(this.wishlistBtn.nativeElement, 'background-color', 'white');
            this.renderer.setStyle(this.wishlistBtn.nativeElement, 'color', 'black');
            this.resTabActive = true;
            this.wishlistTabActive = false;
            this.detailTabActive = false;
        }
    }

    resetForm() {
        this.searchForm.reset({'categoryInput': '', 'location': 'location-current', 'postal': this.postal});
        this.searchForm.form.controls['keywordInput'].setErrors({'invalid': true});
        this.locRadio = 'location-current';
        this.categoryInput = '';

        // reset submission state
        this.isSubmitted = false;
        this.resTabActive = true;
        this.wishlistTabActive = false;
        this.detailTabActive = false;
        this.searchResults = null;
        this.wishlistSelectedItem = {'id': null};
        this.resultsSelectedItem = {'id': null};
        this.toggleResults('results');

        this.itemDetailResults = null;
    }

    deleteWishlistSelectedItem() {
        this.wishlistSelectedItem = {'id': null};
    }

    triggerSlideToDetail($event) {
        this.itemDetailResults = null;
        this.detailTabActive = true;

        let params = {
            'itemId': $event.id
        };

        this.httpClient.get(`${environment.SERVER_PATH}/shopping`, {
            params: params
        }).subscribe((res) => {
            this.itemDetailResults = res;
            this.itemDetailResults['ItemID'] = $event.id;

            // results => item detail
            if ($event.index) {
                this.itemDetailResults['Shipping'] = this.searchResults['results'][$event.index-1]['shipping'] || null;
                this.itemDetailResults['ReturnsAccepted'] = this.searchResults['results'][$event.index-1]['returnsAccepted'] || null;
            } else { // wishlist => item detail
                this.itemDetailResults['Shipping'] = $event.shipping;
                this.itemDetailResults['ReturnsAccepted'] = $event.returnsAccepted;
            }
            if (this.resTabActive) {
                this.resultsSelectedItem = {
                    'id': $event.id, 
                    'shipping': this.itemDetailResults['Shipping'], 
                    'returnsAccepted': this.itemDetailResults['ReturnsAccepted'],
                    'isRes': this.resTabActive
                }; 
            } else {
                this.wishlistSelectedItem = {
                    'id': $event.id, 
                    'shipping': this.itemDetailResults['Shipping'], 
                    'returnsAccepted': this.itemDetailResults['ReturnsAccepted'],
                    'isRes': this.resTabActive
                }; 
            }
        });
    }

    triggerSlideToMain() {
        this.detailTabActive = false;
    }

    search() {
        this.searchResults = null;
        this.isSubmitted = true;
        this.resTabActive = true;
        this.wishlistTabActive = false;
        this.detailTabActive = false;
        this.toggleResults('results');
        
        let controls = this.searchForm.form.controls;
        let params = {
            'keyword': controls['keywordInput'].value,
            'category': this.categoryInput
        }
        if (controls['newCheckbox'].value) {
            params['conditionNew'] = true;
        }
        if (controls['usedCheckbox'].value) {
            params['conditionUsed'] = true;
        }
        if (controls['unspecifiedCheckbox'].value) {
            params['conditionUnspecified'] = true;
        }
        if (controls['localCheckbox'].value) {
            params['localShipping'] = true;
        }
        if (controls['freeCheckbox'].value) {
            params['freeShipping'] = true;
        }
        if (controls['distanceInput'].value) {
            params['distance'] = controls['distanceInput'].value;
        }
        if (controls['otherLocInput'].value) {
            params['postal'] = controls['otherLocInput'].value;
        } else {
            params['postal'] = this.postal;
        }

        this.httpClient.get(`${environment.SERVER_PATH}/finding`, {
            params: params
        }).subscribe((res) => {
            this.searchResults = res;
        });
    }
}
