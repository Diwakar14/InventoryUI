import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidePanelDefaultComponent } from './content-component/side-panel-default/side-panel-default.component';
import { ComponentType } from '../ComponentType';

export interface SidePanelState {
  component: ComponentType;
  isSidePanOpened: boolean;
  data?: any;
  width?: string;
  title?: string;
  icon?: string;
  onCancel?: object;
  onSuccess?: object;
}

@Injectable({ providedIn: 'root' })
export class SidePanelService {
  private sidePanelState = new BehaviorSubject<SidePanelState>({
    component: new ComponentType(SidePanelDefaultComponent, null),
    isSidePanOpened: false,
  });

  get sidePanelData() {
    return this.sidePanelState.getValue();
  }

  get sidePanelState$() {
    return this.sidePanelState;
  }

  closePanel() {
    return this.sidePanelState.next({
      ...this.sidePanelState.getValue(),
      isSidePanOpened: false,
    });
  }

  setSidePanelState(sidePanelState: SidePanelState) {
    return this.sidePanelState.next(sidePanelState);
  }
}
