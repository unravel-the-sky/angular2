import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //templateUrl: './todo-form.component.html',
  //template: '<todo-form></todo-form>',
  styleUrls: ['./app.component.css'],
  // styleUrls: ['http://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css',
  //             './app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app works!';
  values = [];

  addItem(newItem: string){
    this.values.push(newItem);
  }
}
