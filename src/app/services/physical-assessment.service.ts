import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {PhysicalInterface} from '../interfaces/physical.interface';


@Injectable({
  providedIn: 'root'
})
export class PhysicalAssessmentService {


  constructor(private firestore: AngularFirestore) { }


  async saveNewUserPhysicalAssessment(userId: string, physicalAssessment: PhysicalInterface): Promise<void> {
    const userPhysicalCollection: AngularFirestoreDocument = this.firestore.collection('userPhysicalAssessment').doc(userId);
    const physicalCollection: AngularFirestoreCollection = userPhysicalCollection.collection('physicalAssessment');
    const docRef: any = await physicalCollection.add(physicalAssessment);
    const id: string = docRef.id;
    const date: string = new Date().toLocaleDateString('pt-br');
    const [day, month, year] = date.split('/').map(Number);
    const initialDate: Date = new Date(year, month - 1, day);
    initialDate.setMonth(initialDate.getMonth() + 1);
    const nextAssessmentDate: string = initialDate.toLocaleDateString('pt-br');
    const data: {
      id: string,
      createdAt: string,
      nextAssessment: string
    } = {
      id: id,
      createdAt: date,
      nextAssessment: nextAssessmentDate
    };
    return await docRef.update(data);
  }


  async getUserPhysicalAssessmentById(userId: string, physicalAssessmentId: string): Promise<PhysicalInterface> {
    try {
      const physicalDoc: any = await this.firestore
        .collection('userPhysicalAssessment')
        .doc(userId)
        .collection('physicalAssessment')
        .doc(physicalAssessmentId)
        .get()
        .toPromise();
      return physicalDoc.data() as PhysicalInterface
    } catch (err) {
      throw new Error(`Error in getUserPhysicalAssessmentById`);
    }
  }


  async getAllUserPhysicalAssessment(userId: string): Promise<PhysicalInterface[]> {
    try {
      const physicalCollection = await this.firestore
        .collection('userPhysicalAssessment')
        .doc(userId)
        .collection('physicalAssessment')
        .get()
        .toPromise();
      const physicalAssessmentsList: PhysicalInterface[] = [];
      physicalCollection?.forEach((doc: any): void => {
        physicalAssessmentsList.push(doc.data());
      });
      if (physicalAssessmentsList.length > 0) return physicalAssessmentsList
      return [];
    } catch (err) {
      throw new Error(`Error in getAllUserPhysicalAssessment`);
    }
  }


  async deleteUserPhysicalAssessment(userId: string, physicalAssessmentId: string): Promise<void> {
    const physicalDoc = this.firestore
      .collection('userPhysicalAssessment')
      .doc(userId)
      .collection('physicalAssessment')
      .doc(physicalAssessmentId);
    const docRef: any = await physicalDoc.get().toPromise();
    if (docRef.exists) {
      return await physicalDoc.delete();
    } else {
      throw new Error('Physical Assessment document not found!');
    }
  }


}
