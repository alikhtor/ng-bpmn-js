import { Component, OnDestroy, OnInit } from '@angular/core';
import Modeler from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import customControlsModule from '../custom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private modeler: any;

  constructor() {}

  ngOnInit() {
    this.modeler = new Modeler({
      keyboard: { bindTo: document },
      container: '#canvas',
      additionalModules: [
        customControlsModule
      ]
    });
    this.modeler.get('canvas').zoom('fit-viewport');
    this.modeler.createDiagram(null, (err: any) => {
      console.log(err);
    });
  }

  printToConsole() {
    this.modeler.saveXML((err, xml) => {
      console.log(err, xml);

    });
  }

  ngOnDestroy(): void {
    this.modeler.destroy();
  }
}
