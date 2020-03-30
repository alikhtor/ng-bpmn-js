import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';

export class CustomPalette implements PaletteProvider {
  static $inject = ['palette', 'elementFactory'];

  constructor(private palette: any, private elementFactory: any) {
    this.palette.registerProvider(this);
  }

  getPaletteEntries() {
    console.log('HERE!!!');
  }
}
