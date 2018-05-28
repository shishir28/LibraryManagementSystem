import { Component } from '@angular/core';
import { SidenavItem } from './core/sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from './core/sidenav/sidenav.service';

@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(sidenavService: SidenavService) {
    const menu: SidenavItem[] = [];

    menu.push({
      name: 'APPS',
      position: 5,
      type: 'subheading',
      customClass: 'first-subheading'
    });

    menu.push({
      name: 'Dashboard',
      routeOrFunction: '/',
      icon: 'dashboard',
      position: 10,
      pathMatchExact: true
    });

    menu.push({
      name: 'Book',
      routeOrFunction: '/books',
      icon: 'description',
      position: 10,
      pathMatchExact: true
    });

    menu.push({
      name: 'Borrowers',
      routeOrFunction: '/borrowers',
      icon: 'description',
      position: 10,
      pathMatchExact: true
    });

    menu.push({
      name: 'Branches',
      routeOrFunction: '/branches',
      icon: 'description',
      position: 10,
      pathMatchExact: true
    });

    menu.push({
      name: 'Publishers',
      routeOrFunction: '/publishers',
      icon: 'description',
      position: 10,
      pathMatchExact: true
    });
    menu.push({
      name: 'Authors',
      routeOrFunction: '/authors',
      icon: 'description',
      position: 10,
      pathMatchExact: true
    });
    // Send all created Items to SidenavService
    menu.forEach(item => sidenavService.addItem(item));
  }
}
