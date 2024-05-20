import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UserInterface} from "../../../interfaces/user.interface";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
        next: () => {
          console.log('User registered and Firestore document created');
        },
        error: err => {
          console.error('Registration error: ', err);
        }
      });
    } else {
      console.log('senhas diferentes');
    }
  }

}
