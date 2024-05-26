import {Injectable} from '@angular/core';
import {UserInterface} from '../interfaces/user.interface';
import {AuthService} from './auth.service';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {finalize} from 'rxjs';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private user: UserInterface | null = null

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private toastService: ToastService,
  ) {
    this.authService.user.subscribe((userData: UserInterface | null): void => {
      this.user = userData;
    });
  }


  async uploadProfilePicture(): Promise<void> {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
      const userId: string | undefined = this.user?.uid;

      if (userId) {
        const base64Image: string = `data:image/jpeg;base64,${image.base64String}`;
        const filePath: string = `profilePictures/${userId}`;
        const fileRef: AngularFireStorageReference = this.storage.ref(filePath);
        const task: AngularFireUploadTask = fileRef.putString(base64Image, 'data_url');

        task.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await fileRef.getDownloadURL().toPromise();
            await this.firestore.collection('users').doc(userId).update({ profilePicture: downloadURL });
          })
        ).subscribe((): void => {
          this.authService.setUserLocal(userId, this.user);
        });
      } else {
        void this.toastService.presentErrorToast('Ocorreu um erro id!');
      }

    } catch (error) {
      void this.toastService.presentErrorToast('Ocorreu um erro!');
      console.error(error);
    }
  }



}
