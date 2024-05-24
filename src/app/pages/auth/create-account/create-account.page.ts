import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UserInterface} from '../../../interfaces/user.interface';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private navControl: NavController
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  onRegister(): void {
    const user: UserInterface = this.registerForm.value;
    if (this.registerForm.invalid) {
      return void this.toastService.presentErrorToast('O formulário está invalido!')
    }
    if (user.password === user.confirmPassword) {
      void this.authService.register(user);
    } else {
      void this.toastService.presentErrorToast('As senhas estão diferentes!');
    }
  }

  moveRouteBack(url: string): void {
    void this.navControl.navigateBack(url);
  }

}
