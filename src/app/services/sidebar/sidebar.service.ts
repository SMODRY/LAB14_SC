import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteProps, components } from '../../home/components';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  $collapsed = new BehaviorSubject<boolean>(false);
  routes = new BehaviorSubject<RouteProps[]>(components);

  setCollapsed(collapsed: boolean) {
    this.$collapsed.next(collapsed);
  }

  toggleCollapsed() {
    const collapsed = this.$collapsed.getValue();
    this.setCollapsed(!collapsed);

  }
}
