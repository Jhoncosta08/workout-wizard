import {Component} from '@angular/core';
import {UserInterface} from '../../interfaces/user.interface';
import {AuthService} from '../../services/auth.service';

export interface ImcTableDataInterface {
  imcBase: string;
  imcResult: string
}

@Component({
  selector: 'app-imc',
  templateUrl: './imc.page.html',
  styleUrls: ['./imc.page.scss'],
})
export class ImcPage {
  user: UserInterface | null = null;
  userImc: number = 0;
  showImcDetail: boolean = false;
  imcTableData: ImcTableDataInterface[] = [
    {
      imcBase: 'Abaixo de 18.5',
      imcResult: 'Abaixo do peso'
    },
    {
      imcBase: 'Entre 18.5 - 24.9',
      imcResult: 'Peso normal'
    },
    {
      imcBase: 'Entre 25 - 29.9',
      imcResult: 'Sobrepeso'
    },
    {
      imcBase: 'Entre 30 - 34.9',
      imcResult: 'Obesidade I - Leve'
    },
    {
      imcBase: 'Entre 35 - 39.9',
      imcResult: 'Obesidade II - Moderada'
    },
    {
      imcBase: 'Acima de 40',
      imcResult: 'Obesidade III - Grave'
    },
  ];


  constructor(private authService: AuthService) { }


  ionViewWillEnter(): void {
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    this.calcAndSetImc();
  }


  calcAndSetImc(): void {
    if (this.user && this.user.weight && this.user.height) {
      const weight: number = this.user.weight;
      const height: number = (this.user.height / 100);
      const squaredHeight: number = height * height;
      const imc: number = weight / squaredHeight
      this.userImc = Number(imc.toFixed(2));
    }
  }


  checkImcResult(returnType: 'color' | 'imcResult' = 'imcResult'): string {
    switch (true) {
      case this.userImc < 18.5:
        return returnType === 'imcResult' ? 'Abaixo do Peso' : '#ADD8E6';
      case this.userImc >= 18.5 && this.userImc <= 24.9:
        return returnType === 'imcResult' ? 'Peso Normal' : '#00a400';
      case this.userImc >= 25 && this.userImc <= 29.9:
        return returnType === 'imcResult' ? 'Sobrepeso' : '#FFA500';
      case this.userImc >= 30 &&  this.userImc <= 34.9:
        return returnType === 'imcResult' ? 'Obesidade 1' : '#FFA500';
      case this.userImc >= 35 && this.userImc <= 39.9:
        return returnType === 'imcResult' ? 'Obesidade 2' : '#FF4500';
      case this.userImc > 40:
        return returnType === 'imcResult' ? 'Obesidade 3' : '#8B0000';
      default:
        return returnType === 'imcResult' ? '---' : '#cecece';
    }
  }

  checkImcTableDataColor(imcResult: string): string {
    switch (imcResult) {
      case 'Abaixo do peso':
        return '#ADD8E6';
      case 'Peso normal':
        return '#00a400';
      case 'Sobrepeso':
        return '#a9a900';
      case 'Obesidade I - Leve':
        return '#FFA500';
      case 'Obesidade II - Moderada':
        return '#FF4500';
      case 'Obesidade III - Grave':
        return '#8B0000';
      default:
        return '#cecece';
    }
  }


  toggleDetail(): void {
    this.showImcDetail = !this.showImcDetail;
  }


  ionViewWillLeave(): void {
    this.showImcDetail = false;
  }


}
