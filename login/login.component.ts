/**
 * Created by sandhuharjodh2561 on 8/9/2017.
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../common/services/user/user.service';
import {AdminService} from '../../../common/services/admin/admin.service';
import {UsersRestService} from '../../../common/services/user/userreset.service';

@Component({
  selector: '<app-admin-login></app-admin-login>',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../adminComponent/admin.css',
    '../../sharedResources/style/animate.css',
    '../../sharedResources/font-awesome/css/font-awesome.css',
    './login.component.scss'
  ],
  providers: [UsersService, UsersRestService, AdminService],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {
  private form: FormGroup;

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
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  /**
   * Function to login
   */
  public login() {
    if (!this.form.valid) {
      return;
    }
    let userdata = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this._usersService.login(userdata)
      .then((res) => {
        if (res.user.is_admin === 'true') {
          this._adminService.setVerifiedAdminUser(res);
        } else {
          alert(`Invalid login or password`);
        }
      }).catch((error) => {
      alert(`${error.json().message}. Try Again!`);
    });
  }
}
