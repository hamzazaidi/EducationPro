import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../models/Result';

@Injectable()
export class ResultsService {

  constructor(private firestore: AngularFirestore) {}


  getResults(id: string): Observable<Result[]> {
    return this.firestore.collection('results', ref => ref.where('uid', '==', id)).snapshotChanges().pipe(
      map(data => {
        const result =  data.map(e => {
          const data = e.payload.doc.data() as Object;
          return {
            ...data
          } as Result;
        });
        return result;
      })
    );
  }

  async addResult(result: Result): Promise<any> {
    return this.firestore.collection('results').add(result);
  }

}
