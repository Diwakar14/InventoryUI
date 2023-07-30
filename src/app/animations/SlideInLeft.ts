import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SlideInLeft = trigger('SlideInLeft', [
  state(
    'open',
    style({
      width: '28%',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      width: '0%',
      opacity: 0,
    })
  ),

  transition('* => open', [animate('200ms ease-in')]),
  transition('* => closed', [animate('200ms ease-out')]),
]);
