import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnChanges {
    @Input() photoResults: any;
    photoFirst2: any;
    photoNext3: any;
    photoLast3: any;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) { 
        if (!changes.photoResults.currentValue) {
            return;
        }
        this.photoFirst2 = changes.photoResults.currentValue.images.slice(0,2);
        this.photoNext3 = changes.photoResults.currentValue.images.slice(2,5);
        this.photoLast3 = changes.photoResults.currentValue.images.slice(5,8);
    }
}
