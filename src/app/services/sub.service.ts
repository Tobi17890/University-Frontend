import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SubService {
  constructor(private afs: AngularFirestore) {}

  addData(subData: any) {
    this.afs
      .collection('subscribers')
      .add(subData)
      .then(() => {
        console.log('loy tt ai pek ng');
      });
  }

  checkSub(subEmail: any) {
    return this.afs
      .collection('subscribers', (ref) => ref.where('email', '==', subEmail))
      .get();
  }
}
