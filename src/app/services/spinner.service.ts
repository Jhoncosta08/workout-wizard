import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loading: HTMLIonLoadingElement | null = null;
  private isLoading: boolean = false;

  constructor(private loadingController: LoadingController) { }

  show(message: string = 'Carregando...'): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.loadingController.create({message, backdropDismiss: false}).then((loading: HTMLIonLoadingElement): void => {
        this.loading = loading;
        this.loading.present().then((): void => {
          if (!this.isLoading) {
            this.loading?.dismiss();
          }
        });
      });
    }
  }

  hide(): void {
    if (this.loading) {
      this.isLoading = false;
      this.loading.dismiss().then((): void => {
        this.loading = null;
      });
    }
  }

}
