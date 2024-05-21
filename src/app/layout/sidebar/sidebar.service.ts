import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  public menuitems: any = [
    {
      name: "home",
      id: 101,
      index: 0,
      nzicon: "home",
      DisplayName: "Home",
      isVisible: true,
      expandStatus: false,
    }





    
  ]

  public openHandler(index: number, openStatus: boolean = false): void {
    if (openStatus) {
      this.menuitems[index].expandStatus = true
    }

    this.menuitems.forEach(menu => {
      if (menu.index != index) {
        this.menuitems[menu.index].expandStatus = false;
      }
    });
  }

}
