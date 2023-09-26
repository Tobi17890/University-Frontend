import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { limit } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class PostsService implements OnInit {
  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {}

  //=====================================
  loadFeatured() {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(8),
      )
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
  //=====================================

  //=====================================
  loadLatest() {
    return this.firestore
      .collection('posts', (ref) => ref.orderBy('title'))
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

  loadCatePost(id: any[] = []) {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', id).limit(4)
      )
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

  loadOnePost(post: any[] = []) {
    return this.firestore.doc(`posts/${post}`).valueChanges();
  }

  loadRelatedPost(catId: any[] = []) {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', catId).limit(4)
      )
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

  countView(postId: [] = []) {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };
    this.firestore
      .doc(`posts/${postId}`)
      .update(viewsCount)
      .then(() => {
        console.log('khob');
      });
  }

  searchPost(searchString: string) {
    if (searchString) {
      return this.firestore
        .collection('posts', (ref) =>
          ref
            .where('keywords', 'array-contains', searchString?.toUpperCase())
            .limit(20)
        )
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
    } else {
      return this.loadFeatured();
    }
  }
}
