import {Component, ContentChild, Input, Inject, forwardRef, AfterViewInit} from '@angular/core';
import {SBItemBodyComponent} from './sb-item.body';
import {SqueezeBoxComponent} from './squeezebox';

@Component({
  exportAs: 'sbItem',
  selector: 'mdb-item',
  templateUrl: 'sb-item.html'
})
export class SBItemComponent implements AfterViewInit {

  private squeezebox: SqueezeBoxComponent;

  @Input() public collapsed = true;

  @ContentChild(SBItemBodyComponent) body: SBItemBodyComponent;

  constructor(@Inject(forwardRef(() => SqueezeBoxComponent)) squeezebox: SqueezeBoxComponent) {
    this.squeezebox = squeezebox;
  }

  ngAfterViewInit() {
    this.body.toggle(this.collapsed);
  }
  toggle(collapsed: boolean) {
    this.squeezebox.didItemToggled(this);
    this.applyToggle(collapsed);
  }

  applyToggle(collapsed: boolean) {
    this.collapsed = collapsed;
    this.body.toggle(collapsed);
  }

}
