import { Injectable } from '@angular/core'
import { ToastsManager } from 'ng2-toastr'

@Injectable()

export class ToastrService {
  constructor(private toastr: ToastsManager,) {
  }

  showSuccess(title, msg) {
    this.toastr.success(msg, title);
  }

  showError(title, msg) {
    this.toastr.error(msg, title);
  }

  showWarning(title, msg) {
    this.toastr.warning(msg, title);
  }

  showInfo(title, msg) {
    this.toastr.info(msg, title);
  }
  
//   showCustom() {
//     this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
//   }
}
