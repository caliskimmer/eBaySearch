import { trigger, transition, animate, style } from '@angular/animations';

export var animations = [
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0}),
            animate('0.15s', style({ opacity: 1 }))
        ])
    ]),
    trigger('noop', [
        transition(':enter', [])
    ])
];
