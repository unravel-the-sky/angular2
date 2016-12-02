import { Component, ElementRef } from '@angular/core';
import { TodoItem } from './todoItem';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import {map} from 'rxjs/operator/map';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)
import { TodoFormComponent } from './todo-form.component'

@Component({
    selector: 'renderer',
    templateUrl: 'renderer.component.html',
    styleUrls: ['stylesRenderer.css']
})
export class RendererComponent {
    items: FirebaseListObservable<any>;

    //threeJS stuff;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: THREE.OrbitControls;

    counter: number;

    mainSphere: THREE.Mesh;
    mainObject: THREE.Object3D;

    hostElement: ElementRef;
    angularFire: AngularFire;

    constructor(el: ElementRef, af: AngularFire){
        this.items = af.database.list('/todoItems');
        this.hostElement = el;
        this.angularFire = af;
    }

    ngOnInit(){
        this.initThreeJs();
    }

    initThreeJs(){

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setClearColor(0xFFAAAAFF, 1);
		this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        this.hostElement.nativeElement.appendChild(this.renderer.domElement);

        this.mainObject = new THREE.Object3D();

        this.counter = 0;
        // this.items.forEach(
        //         i=>i.forEach(
        //             e=>(
        //                     console.log(this.counter, e.status),
        //                     this.fillWithObjects(this.counter++, e.status)
        //                 )
        //         )
        //     );

        this.items
            .subscribe(infos => {
                infos.forEach(info => {
                    // this.fillWithObjects(this.counter++, info.status)
                    console.log(info.name);
                })
            });

        // let bb = new THREE.Box3();
        // bb.setFromObject(this.mainObject);

        // var xCoord = (bb.max.x + bb.min.x) / 2;
        // var yCoord = (bb.max.y + bb.min.y) / 2;
        // var zCoord = (bb.max.z + bb.min.z) / 2;

        // this.camera.position.x = xCoord;
        // this.camera.position.y = yCoord;
        // this.camera.position.z = yCoord*2;

        for (let i=0; i<10 ; i++){
            this.fillWithObjects(i, 'Done');
        }
        

        this.scene.add(this.mainObject);

        this.camera.position.z = 80;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 1.5;
        this.controls.autoRotateSpeed = 5.5;
        this.controls.addEventListener('change', this.render);

        // this.controls.target = new THREE.Vector3(this.camera.position.x, this.camera.position.y, 0);


        this.render();
    }

    fillWithObjects(pos: number, status: string){
        let sphereGeometry = new THREE.SphereGeometry( 15, 165, 165 );
        let cubeGeometry = new THREE.BoxGeometry( 5, 5, 5, 65, 65 );

        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

        let redMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0033 } );
        let yellowMaterial = new THREE.MeshBasicMaterial( { color: 0xFFCC33 } );
        let greenMaterial = new THREE.MeshBasicMaterial( { color: 0x3366FF } );

        if (status == "Done")
            material.color = greenMaterial.color;
        else if (status == "In progress")
            material.color = yellowMaterial.color;
        else if (status == "Pending")
            material.color = redMaterial.color;

        let oneSphere = new THREE.Mesh(cubeGeometry, material);

        oneSphere.position.x = pos * 20;

        this.mainObject.add(oneSphere);
    }



    render = () => {
        requestAnimationFrame(this.render);

        // this.mainSphere.rotation.x += 0.1;
        // this.mainSphere.rotation.y += 0.1;

        this.renderer.render(this.scene, this.camera);
    }

}