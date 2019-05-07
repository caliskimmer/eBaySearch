import { trigger, state, transition, animate, style } from '@angular/animations';

export var animations = [
    trigger('hideShow', [
        transition(':enter', [
            style({ position: 'absolute', width: '*', transform: 'translateX(-98%)' }),
            animate('0.4s ease-out', style({ transform: 'translateX(0)'})),
        ]),
        transition(':leave', [
            style({ position: 'absolute', width: '*' }),
            animate('0.4s ease-out', style({ transform: 'translate(98%)'})),
        ])
    ]),
    trigger('noop', [ // this triggers on parent load and prevents child animations from running
        transition(':enter', [])
    ])
];
