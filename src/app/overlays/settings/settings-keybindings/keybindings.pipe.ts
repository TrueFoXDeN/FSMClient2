import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keybindings',
  standalone: true
})
export class KeybindingsPipe implements PipeTransform {

  transform(value: string): string {
    let readableString = ""
    let shortcutArray = value.split("+")
    let arrayLength = shortcutArray.length
    for (let i = 0; i < arrayLength - 1; i++) {
      if (shortcutArray[i] != "") {
        readableString += shortcutArray[i] + " + ";
      }
    }
    readableString += shortcutArray[arrayLength - 1];
    return readableString;
  }

}
