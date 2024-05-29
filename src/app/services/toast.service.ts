import { Injectable } from '@angular/core';
import {ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private currentToast: any = null;


  constructor(
    private toastController: ToastController
  ) { }


  async presentToast(
    message: string,
    duration: number = 2000,
    color: string = 'primary',
    position: 'top' | 'bottom' | 'middle' = 'bottom'
  ): Promise<void> {
    if (this.currentToast) await this.currentToast.dismiss();
    this.currentToast = await this.toastController.create({
      message,
      duration,
      color,
      position,
    });
    this.currentToast.present();
  }


  async presentSuccessToast(message: string): Promise<void> {
    void this.presentToast(message, 2000, 'success', 'bottom');
  }


  async presentErrorToast(message: string): Promise<void> {
    void this.presentToast(message, 2000, 'danger', 'bottom');
  }


  async presentWarningToast(message: string): Promise<void> {
    void this.presentToast(message, 2000, 'warning', 'bottom');
  }


  async presentInfoToast(message: string): Promise<void> {
    void this.presentToast(message, 2000, 'tertiary', 'bottom');
  }


}
