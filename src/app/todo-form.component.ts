import { Component } from '@angular/core';
import { TodoItem } from './todoItem';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import * as THREE from 'three';
import "rxjs/add/operator/map";
// import { OrderByPipe } from 'fuel-ui/fuel-ui'

@Component({
    // moduleId: module.id,
    selector: 'todo-form',
    templateUrl: 'todo-form.component.html',
    styleUrls: ['todo-form.component.css']
})
export class TodoFormComponent {
    items: FirebaseListObservable<any>;
    queries: FirebaseListObservable<any[]>;
    deadlineSubject: Subject<any>;
    af: AngularFire;
    constructor(af: AngularFire){
        this.items = af.database.list('/todoItems');
        // and add queries!!
        this.queries = af.database.list('/todoItems', {
            query: {
                orderByChild: 'status',
                // equalTo: this.status
            }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    ngOnInit(){}

    filterBy(deadline: string){
        this.deadlineSubject.next(deadline);
    }

    sortByStatus(){
        this.queries = this.af.database.list('/todoItems', {
            query: {
                orderByChild: 'status',
                // equalTo: this.status
            }
        }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    sortByDeadline(){
        this.queries = this.af.database.list('/todoItems', {
            query: {
                orderByChild: 'status',
                // equalTo: this.status
            }
        });

        console.log("wee");
    }

    dueDates = ['Today','Tomorrow', 'This week', 'Later'];
    status = ['Pending', 'In progress', 'Done'];
    
    model = new TodoItem(0, '', this.status[0], this.dueDates[0], 'Sadan');
    
    submitted = false;

    onSubmit(){
        this.submitted = true;
        this.model.id ++;
        // alert(JSON.stringify(this.model));

        //TODO: buraya firebase ekleyip web e aticaz bu modeli
        //      ordan da ayni hizla app e
        this.items.push({
            id: this.model.id, 
            name: this.model.name, 
            status: this.model.status, 
            deadline: this.model.dueTo, 
            who: this.model.who
        });

        this.model.name = '';

        //check to see if it actually worked:
        // this.items
        //     .subscribe(snapshots => {
        //         snapshots.forEach(snapshot => {
        //             console.log(snapshot.key)
        //             console.log(snapshot.val())
        //         })
        //     });
    }

    setTaskToResolved(key:string){
        this.items.update(key, { status: 'Done'});
    }

    setTaskToPending(key:string){
        this.items.update(key, { status: 'Pending'});
    }

    setTaskToNotResolved(key:string){
        this.items.update(key, { status: 'In progress'});
    }

    deleteTask(key: string){
        this.items.remove(key);
    }

    deleteAllTasks(){
        this.items.remove();
    }

    addTask(){
        this.model = new TodoItem(2, 'this shall come from outside', this.status[0], this.dueDates[0], this.model.who);
    }

    get diagnostics(){
        return JSON.stringify(this.model);
    }

    getThisComponent(){
        return this;
    }
}

