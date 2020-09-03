import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  constructor(private firestore: AngularFirestore) {}

  getCategories({ cache }: { cache: boolean }): Observable<Category[]> {
    const categoriesString = localStorage.getItem('categories');
    const categories: Category[] = categoriesString ? JSON.parse(categoriesString) : [] as Category[];
    if (categories.length && cache) { return of(categories); }
    return this.firestore.collection('category').snapshotChanges().pipe(
      map(data => {
        const result =  data.map(e => {
          const data = e.payload.doc.data() as Object;
          return {
            key: e.payload.doc.id,
            ...data
          } as Category;
        });
        localStorage.setItem('categories', JSON.stringify(result));
        return result;
      })
    );
  }

  async addCategory(category: any): Promise<any> {
    return this.firestore.collection('category').add(category);
  }

  async updateCategory(category: Category) {
     return this.firestore.doc('category/' + category.key).update(category);
  }

  async deleteCategory(key: string) {
    this.firestore.doc('category/' + key).delete();
  }

}
