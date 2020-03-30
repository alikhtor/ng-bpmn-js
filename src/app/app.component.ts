import { Component, OnInit } from '@angular/core';
import Modeler from 'bpmn-js/dist/bpmn-modeler.production.min.js';
// import BpmnPalletteModule from 'bpmn-js/lib/features/palette';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modeler: any;

  ngOnInit() {
    this.modeler = new Modeler({
      keyboard: { bindTo: document },
      container: '#canvas',
      width: '100%'
    });
    this.modeler.createDiagram(null, (err: any) => {
      console.log(err);
    });
  }
}
