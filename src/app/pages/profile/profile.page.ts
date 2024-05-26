import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CameraService} from '../../services/camera.service';
import {UserInterface} from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: UserInterface | null = null;
  public profileImg: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor(
    private authService: AuthService,
    private cameraService: CameraService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit():void  {
    this.authService.user.subscribe((userData: UserInterface | null): void => {
      this.user = userData;
      if ( this.user && this.user.profilePicture) {
        this.profileImg = this.user.profilePicture;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  async onUploadProfilePicture(): Promise<void> {
    await this.cameraService.uploadProfilePicture();
  }


}
