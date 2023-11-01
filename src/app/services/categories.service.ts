import { Injectable, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';/
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements OnInit {
  private nameSource = new BehaviorSubject<string>('');
  currentName = this.nameSource.asObservable();
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {}

  loadData() {
    return this.afs
      .collection('items')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadPhnomPenh() {
    return this.afs
      .collection('items', (ref) => ref.where('category', '==', 'Phnom Penh'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  // -------------

  changeName(name: string) {
    this.nameSource.next(name);
  }
  // ------------
}
