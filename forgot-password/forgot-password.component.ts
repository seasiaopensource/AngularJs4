/**
 * Created by sandhuharjodh2561 on 8/9/2017.
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsersService } from '../../../common/services/user/user.service';
import { AdminService } from '../../../common/services/admin/admin.service';
import { UsersRestService } from '../../../common/services/user/userreset.service';

@Component({
  selector: '<app-admin-forgot-password></app-admin-forgot-password>',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    '../../adminComponent/admin.css',
    '../../sharedResources/style/animate.css',
    '../../sharedResources/font-awesome/css/font-awesome.css',
    './forgot-password.component.scss',
  ],
  providers: [UsersService, UsersRestService, AdminService],
  encapsulation: ViewEncapsulation.None
})

export class ForgotPasswordComponent {
  private form: FormGroup;
  private passwordReset: boolean;
  private message: string;

  /**
   * Constructor for login component
   * @param _usersService
   * @param _adminService
   * @param formBuilder
   */
  constructor(private _usersService: UsersService, private _adminService: AdminService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: ['', [
        Validators.email,
      ]]
    });
  }

  /**
   * Function to login
   */
  public forgotPassword() {
    if (!this.form.valid) return;
    let userdata = {
      'email': this.form.value.email,
    };
    this._usersService.forgotPassword(userdata)
      .then((res) => {
        this.passwordReset = true;
        this.message = res.message;
        console.log(res);
      }).catch((error) => {
      alert(`${error.json().message}. Try Again!`);
    });
  }
}
