import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from '../models/Question';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


@Injectable()
export class QuizService {
  constructor(private firestore: AngularFirestore) { }

  getQuestions(id: string): Observable<Question[]> {
    return this.firestore.collection("questions", ref => ref.where("category", "==", id)).snapshotChanges().pipe(
      map(data => {        
        const result =  data.map(e => {
          const data = e.payload.doc.data() as Question;
          return {
            key: e.payload.doc.id,
            answers: shuffle(data.answers),
            category: data.category,
            question: data.question
          } as Question;
        })  
        
        return shuffle(result);    
      })
    );
  }

  async addQuestion(q: any) {
    const data = {
      question: q.question,
      answers: q.answers.map((a, i) =>({ key: i, value: a.value, isCorrect: i === q.correct })),
      category: q.category
    }
    return this.firestore.collection('questions').add(data);
  }

  async deleteQuestion(key: string) {
    this.firestore.doc('questions/' + key).delete();
  }
  
  async updateQuestion(q: any) {
    const data = {
      question: q.question,
      answers: q.answers.map((a, i) =>({ key: i, value: a.value, isCorrect: i === q.correct })),
      category: q.category
    }
     return this.firestore.doc('questions/' + q.key).update(data);
  }

}
