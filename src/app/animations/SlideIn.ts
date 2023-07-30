import { trigger, transition, style, animate } from '@angular/animations';

export const SlideIn = trigger('SlideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(10px)' }),
    animate('500ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    animate(
      '500ms ease-out',
      style({ opacity: 0, transform: 'translateX(10px)' })
    ),
  ]),
]);
