import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
// import { Scene } from 'three';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form.component';
import { RendererComponent } from './renderer.component';

// Must export the config --> taken from https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md
export const firebaseConfig = {
  apiKey: "AIzaSyA-Y2wQf4GGnlm3p753P_NlIkCJxTpD5jA",
  authDomain: "todolistapp-19d18.firebaseapp.com",
  databaseURL: "https://todolistapp-19d18.firebaseio.com",
  storageBucket: "todolistapp-19d18.appspot.com",
  messagingSenderId: "507798485330"
};

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    RendererComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
