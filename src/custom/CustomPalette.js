import {
  assign
} from 'min-dash';

export default class CustomPalette {
    constructor(create, elementFactory, palette, translate, spaceTool, lassoTool, handTool, globalConnect) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
      this.spaceTool = spaceTool;
      this.lassoTool = lassoTool;
      this.handTool = handTool;
      this.globalConnect = globalConnect;
      

      // console.log(palette.getEntries());
      // console.log('##################');
      // console.log(palette.getPaletteEntries());
      
      
  
      palette.registerProvider(this);
    }
  
    getPaletteEntries(element) {
      const {
        create,
        elementFactory,
        translate,
        globalConnect,
        handTool,
        lassoTool,
        spaceTool
      } = this;
  
      function createServiceTask(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
  
        create.start(event, shape);
      }

      function createAction(type, group, className, title, options) {

        function createListener(event) {
          const shape = elementFactory.createShape(assign({ type: type }, options));
    
          if (options) {
            shape.businessObject.di.isExpanded = options.isExpanded;
          }
    
          create.start(event, shape);
        }
    
        const shortType = type.replace(/^bpmn:/, '');
    
        return {
          group: group,
          className: className,
          title: title || translate('Create {type}', { type: shortType }),
          action: {
            dragstart: createListener,
            click: createListener
          }
        };
      }
    
      return () => {        
        return {
          'hand-tool': {
            group: 'tools',
            className: 'bpmn-icon-hand-tool',
            title: translate('Activate the hand tool'),
            action: {
              click: function(event) {
                handTool.activateHand(event);
              }
            }
          },
          'lasso-tool': {
            group: 'tools',
            className: 'bpmn-icon-lasso-tool',
            title: translate('Activate the lasso tool'),
            action: {
              click: function(event) {
                lassoTool.activateSelection(event);
              }
            }
          },
          'space-tool': {
            group: 'tools',
            className: 'bpmn-icon-space-tool',
            title: translate('Activate the create/remove space tool'),
            action: {
              click: function(event) {
                spaceTool.activateSelection(event);
              }
            }
          },
          'global-connect-tool': {
            group: 'tools',
            className: 'bpmn-icon-connection-multi',
            title: translate('Activate the global connect tool'),
            action: {
              click: function(event) {
                globalConnect.toggle(event);
              }
            }
          },
          'tool-separator': {
            group: 'tools',
            separator: true
          },
          'create.start-event': createAction(
            'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none',
            translate('Create StartEvent')
          ),
          'create.end-event': createAction(
            'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none',
            translate('Create EndEvent')
          ),
          'create.exclusive-gateway': createAction(
            'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor',
            translate('Create Gateway')
          ),
          'create.receive-task': createAction(
            'bpmn:ReceiveTask', 'activity', 'bpmn-icon-receive-task',
            translate('Create Task')
          ),
          // 'create.receive-task': createAction(
          //   'bpmn:ReceiveTask', 'activity', 'bpmn-icon-receive-task',
          //   translate('Create Task')
          // ),
          'create.service-task': {
            group: 'activity',
            className: 'bpmn-icon-service-task',
            title: translate('Create ServiceTask'),
            action: {
              dragstart: createServiceTask,
              click: createServiceTask
            }
          }
        }
      }
    }
  }
  
  CustomPalette.$inject = [
    'create',
    'elementFactory',
    'palette',
    'translate',
    'spaceTool',
    'lassoTool',
    'handTool',
    'globalConnect',
  ];

