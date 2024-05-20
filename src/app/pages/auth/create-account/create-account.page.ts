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
    private navControl: NavController,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  onRegister(): void {
    const user: UserInterface = this.registerForm.value;
    if (user.password === user.confirmPassword) {
      this.authService.register(user).subscribe({
        next: (): void => {
          this.registerForm.reset();
          this.toastService.presentSuccessToast(`Usuário ${user.name ?? ''} criado com sucesso.`).then((): void => {
            void this.navControl.navigateForward(['/home']);
          });
        },
        error: err => {
          void this.toastService.presentErrorToast('Ocorreu um erro ao registrar!');
          console.error('Registration error: ', err);
        }
      });
    } else {
      void this.toastService.presentErrorToast('As senhas estão diferentes!');
    }
  }

}
