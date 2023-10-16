import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PortalDirective } from '../../directives/portal.directive';
import { SidePanelService, SidePanelState } from './side-panel.service';
import { fadeInAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [fadeInAnimation],
})
export class SidePanelComponent implements AfterViewInit {
  isOpened: boolean = false;
  title!: string;

  @ViewChild(PortalDirective, { static: false })
  portalDirective: PortalDirective;

  constructor(private sidePanelService: SidePanelService) {}

  ngAfterViewInit(): void {
    this.sidePanelService.sidePanelState$.subscribe({
      next: (value: SidePanelState) => {
        this.isOpened = value.isSidePanOpened;
        this.title = value.title as string;
        this.loadComponent(value);
      },
    });
  }

  loadComponent(sidePanelComponent: SidePanelState) {
    let viewContainerRef = this.portalDirective.viewContainerRef;
    viewContainerRef.clear();
    let component = sidePanelComponent.component;
    let newComponent = viewContainerRef.createComponent(component.component);
    newComponent.instance.data = component?.data;
  }

  /**
   * Close the sidepanel
   */
  close() {
    this.sidePanelService.closePanel();
  }
}
