import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CameraService} from '../../services/camera.service';
import {UserInterface} from '../../interfaces/user.interface';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public user: UserInterface | null = null;
  public profileImg: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  disableCam: boolean = false;


  constructor(
    private authService: AuthService,
    private cameraService: CameraService,
    private changeDetectorRef: ChangeDetectorRef,
    private navControl: NavController
  ) {}


  ionViewWillEnter(): void {
    this.authService.user.subscribe({
      next: (userData: UserInterface | null): void => {
        this.user = userData;
        if ( this.user && this.user.profilePicture) {
          this.profileImg = this.user.profilePicture;
          this.changeDetectorRef.detectChanges();
          this.disableCam = false;
        }
      },
      error: err => {
        this.disableCam = false;
        console.error('Error in get user info', err);
      }
    });
  }


  async onUploadProfilePicture(): Promise<void> {
    this.disableCam = true;
    await this.cameraService.uploadProfilePicture().catch(err => {
      this.disableCam = false;
      console.error('Error in onUploadProfilePicture', err);
    });
  }


  goToEditProfile(): void {
    void this.navControl.navigateForward('edit-profile');
  }


}
