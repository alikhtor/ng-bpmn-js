import { Component, OnDestroy, OnInit } from '@angular/core';
import Modeler from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import customControlsModule from '../custom';

import propertiesPanelModule from 'bpmn-js-properties-panel';
// providing camunda executable properties, too
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
// import BpmnModdle from 'bpmn-moddle';

// moddle.fromXML(xmlStr, function(err, definitions) {

//   // update id attribute
//   definitions.set('id', 'NEW ID');

//   // add a root element
//   var bpmnProcess = moddle.create('bpmn:Process', { id: 'MyProcess_1' });
//   definitions.get('rootElements').push(bpmnProcess);

//   moddle.toXML(definitions, function(err, xmlStrUpdated) {

//     // xmlStrUpdated contains new id and the added process

//   });

// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private modeler: any;
  private moddle: any;

  constructor() {}

  ngOnInit() {
    this.modeler = new Modeler({
      keyboard: { bindTo: document },
      container: '#canvas',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        // customControlsModule,
        propertiesPanelModule,
        propertiesProviderModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      },
    });
    this.modeler.get('canvas').zoom('fit-viewport');
    this.modeler.createDiagram(null, (err: any) => {
      console.log(err);
    });
    // this.moddle = new BpmnModdle();
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
