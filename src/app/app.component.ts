import { Component, OnDestroy, OnInit } from '@angular/core';
import Modeler from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import customControlsModule from '../custom';


// const customExtension = {
//   name: 'Collaboration variables payload',
//   uri: 'http://www.graphinfotec.com/schema/xml/variables',
//   prefix: 'var',
//   xml: {
//     tagAlias: 'lowerCase'
//   },
//   types: [
//     {
//       name: 'ElementVariables',
//       superClass: [
//         'Element'
//       ],
//       properties: [
//         {
//           name: 'variables',
//           isMany: true,
//           type: 'Variable'
//         }
//       ]
//     },
//     {
//       name: 'Variable',
//       properties: [
//         {
//           name: 'id',
//           type: 'String'
//         },
//         {
//           name: 'name',
//           type: 'String'
//         },
//         {
//           name: 'title',
//           type: 'String'
//         },
//         {
//           name: 'value',
//           type: 'String'
//         }
//       ]
//     }
//   ],
//   emumerations: [],
//   associations: []
// };


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
