import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StoreService {

  private messageSource = new BehaviorSubject<{}>({}); // this will hold the current value of the message
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage( message ) {
    this.messageSource.next( message );
  }
}
