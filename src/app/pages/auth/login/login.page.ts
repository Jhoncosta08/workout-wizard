import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInterface} from '../../../interfaces/login.interface';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';
import {SpinnerService} from '../../../services/spinner.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private navControl: NavController,
    private spinnerControl: SpinnerService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return void this.toastService.presentErrorToast('O formulário está invalido!');
    }
    this.spinnerControl.show();
    const user: LoginInterface = this.loginForm.value;
    this.authService.login(user).subscribe({
      next: (): void => {
        this.toastService.presentSuccessToast('Login efetuado com sucesso!').then((): void => {
          this.navControl.navigateForward('/home').then((): void => {
            this.spinnerControl.hide();
          })
        })
      },
      error: err => {
        this.spinnerControl.hide();
        console.error('Error in login', err);
      }
    })
  }

  moveRouteBack(url: string): void {
    void this.navControl.navigateBack(url);
  }

}
