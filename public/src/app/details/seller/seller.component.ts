import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
    @Input() itemDetailResults: any;

    constructor() { }

    ngOnInit() {
    }

    getFeedbackColor(rating) {
        let index = rating.indexOf('Shooting');
        if (index === -1) {
            return rating.toLowerCase();
        }

        return rating.slice(0, index).toLowerCase();
    }

    getFeedbackType(feedbackScore) {
        if (feedbackScore > 10000) {
           return 'stars';
        } else {
            return 'star_border';
        }
    }
}
