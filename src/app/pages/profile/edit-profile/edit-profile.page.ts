import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {UserInterface} from '../../../interfaces/user.interface';
import {SpinnerService} from '../../../services/spinner.service';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  userForm: FormGroup;
  user: UserInterface | null = null;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private navControl: NavController,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    this.userForm = this.fb.group({
      name: [this.user?.name ?? '', [Validators.required]],
      email: [{ value: this.user?.email ?? '', disabled: true }, [Validators.required, Validators.email]],
      age: [this.user?.age ?? '', [Validators.required]],
      weight: [this.user?.weight ?? '', [Validators.required]],
      height: [this.user?.height ?? '', [Validators.required]],
      gender: [this.user?.gender ?? '', [Validators.required]],
    });
  }


  onSaveForm(): void {
    if (this.userForm.valid) {
      this.spinnerService.show('Atualizando usuário...');
      const formValues: UserInterface = this.userForm.value;
      this.userService.updateUser(formValues).then((): void => {
        void this.toastService.presentSuccessToast('Usuário atualizado com sucesso!');
        this.navControl.navigateBack('/profile').then((): void => {
          this.spinnerService.hide();
        });
      }).catch(err => {
        void this.toastService.presentSuccessToast('Ocorreu um erro!');
        this.spinnerService.hide();
        console.error('Error in update user', err);
      });
    }
  }


}
