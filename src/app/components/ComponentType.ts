import { Type } from '@angular/core';

export class ComponentType {
  constructor(public component: Type<any>, public data: any) {}
}
