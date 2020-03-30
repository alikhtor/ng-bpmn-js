import { Component, OnInit } from '@angular/core';
import Modeler from 'bpmn-js/dist/bpmn-modeler.production.min.js';
// import BpmnPalletteModule from 'bpmn-js/lib/features/palette';
import { cp } from 'palette/palette';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modeler: any;

  constructor() {}

  ngOnInit() {
    this.modeler = new Modeler({
      keyboard: { bindTo: document },
      container: '#canvas',
      width: '100%',
      additionalModules: [
          {}
        // {
        //   __init__: [ 'interactionLogger' ],
        //   interactionLogger: [ 'type', (eventBus) => {
        //     eventBus.on('element.hover', (event) => {
        //       console.log('here');
        //     });
        //   } ]
        // }
      ]
    });
    this.modeler.createDiagram(null, (err: any) => {
      console.log(err);
    });
  }

  printToConsole() {
    this.modeler.saveXML((err, xml) => {
      console.log(err, xml);

    });
  }
}
