export default function Listener(eventBus) {
  eventBus.on('shape.added', 999999, function(event) {
    console.log('Did you just try to create something?!', event);
  });
}

Listener.$inject = [ 'eventBus' ];