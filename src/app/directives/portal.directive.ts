import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[portal]',
})
export class PortalDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
