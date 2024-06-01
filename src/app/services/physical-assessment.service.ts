import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {PhysicalInterface} from '../interfaces/physical.interface';


@Injectable({
  providedIn: 'root'
})
export class PhysicalAssessmentService {


  constructor(private firestore: AngularFirestore) { }


  async saveNewUserPhysicalAssessment(userId: string, physicalAssessment: PhysicalInterface) {
    const userPhysicalCollection: AngularFirestoreDocument = this.firestore.collection('userPhysicalAssessment').doc(userId);
    const physicalCollection: AngularFirestoreCollection = userPhysicalCollection.collection('physicalAssessment');
    const docRef: any = await physicalCollection.add(physicalAssessment);
    const id: string = docRef.id;
    const date: string = new Date().toLocaleDateString('pt-br');
    const data: {id: string, createdAt: string} = {id: id, createdAt: date};
    return await docRef.update(data);
  }

}
