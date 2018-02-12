import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from '../../../typescripts/free/index';
import { FormControl, Validators } from '@angular/forms';
import { AuthState } from '../../../store/state/auth.state';
import { Store } from '@ngrx/store';
import { ToastrService } from '../../../services/toastr.service';
import { UserService } from '../../../services/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() user;
  @ViewChild('editForm') editForm: ModalDirective;

  public form: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    image: new FormControl('')
  })

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {
  }

  open() {
    this.editForm.show();
  }

  getFirstnameErrors() {
    return this.firstname.hasError('required') ? 'You must enter a value' : '';
  }

  getLastnameErrors() {
    return this.lastname.hasError('required') ? 'You must enter a value' : '';
  }

  get firstname() {
    if (!this.form) {
      return;
    }
    return this.form.get('firstname');
  }

  get lastname() {
    if (!this.form) {
      return;
    }
    return this.form.get('lastname');
  }


  get image() {
    if(!this.form){
      return;
    }

    return this.form.get('image')
  }

  ngOnInit() {
      if (this.user) {
      this.form.setValue({
        firstname: this.user.firstName,
        lastname: this.user.lastName,
        image: this.user.image ? this.user.image : ''
      })
    }
  }

  edit() {
    let following = this.user.following ? this.user.following : {}

    let user = {
      email: this.user.email,
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      image: this.image.value,
      following: following
    }

    this.userService.editUser(user).subscribe(data => {
      this.toastr.showSuccess('Updated profile', 'You have updated your profile information');
    })
  }

}
