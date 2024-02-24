import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";


interface SideNavTogg {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() onToggleSideNav: EventEmitter<SideNavTogg> = new EventEmitter();
  collapsed = false;

  navData = navbarData;
}
