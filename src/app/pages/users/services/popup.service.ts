import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private showPopupSource = new Subject<boolean>();
  showPopup$ = this.showPopupSource.asObservable();

  showPopup(){
    this.showPopupSource.next(true);
  }

  hidePopup(){
    this.showPopupSource.next(false);
  }
  constructor() { }
}
