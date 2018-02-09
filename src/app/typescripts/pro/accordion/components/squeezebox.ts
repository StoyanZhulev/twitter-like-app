import {Component, Input, ContentChildren, QueryList, forwardRef} from '@angular/core';
import {SBItemComponent} from './sb-item';

@Component({
  exportAs: 'squeezebox',
  selector: 'mdb-squeezebox',
  templateUrl: 'squeezebox.html'
})
export class SqueezeBoxComponent {

  @Input() multiple = true;

  @ContentChildren(forwardRef(() => SBItemComponent)) items: QueryList<SBItemComponent>;

  constructor() {}

  didItemToggled(item: SBItemComponent) {
    // on not multiple, it will collpase the rest of items
    if (!this.multiple) {
      this.items.toArray().forEach(function(i) {
        if (i !== item) {
          i.applyToggle(true);
        }
      });
    }
  }

}
