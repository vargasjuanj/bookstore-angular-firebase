import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BookInterface } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  constructor(private afs: AngularFirestore) {

  }
  private booksCollection: AngularFirestoreCollection<BookInterface>
  private books: Observable<BookInterface[]>
  private bookDoc: AngularFirestoreDocument<BookInterface>
  private book: Observable<BookInterface>

public selectedBook:BookInterface={
  id:null,
titulo:'',
idioma:'',
precio:'',
autor:'',
oferta:'',
portada:'',
link_amazon:'',
descripcion:''
  }

  getAllBooks() {
  this.booksCollection = this.afs.collection<BookInterface>('books')
    this.books = this.booksCollection.valueChanges({ idField: 'id' })
    return this.books;

  }
  getAllBooksOffers() {
    this.booksCollection = this.afs.collection<BookInterface>('books',ref=>ref.where('oferta','==','1'))
    this.books = this.booksCollection.valueChanges({ idField: 'id' })
    return this.books;

  }

getOneBook(idBook:string){

  this.bookDoc=this.afs.doc<BookInterface>(`books/${idBook}`)
 return this.book=this.bookDoc.snapshotChanges().pipe(
    map(action=>{
      if(action.payload.exists===false){
        alert('error, id not found')
        return null;

      }else{
        const data=action.payload.data() as BookInterface
        data.id=action.payload.id
      alert(data.id)
        return data
      }
    })
  )
}
addBook(book:BookInterface) {
  this.booksCollection.add(book)
 }

updateBook(book:BookInterface) {
let idBook=book.id

this.bookDoc=this.afs.doc<BookInterface>(`books/${idBook}`)
this.bookDoc.update(book)

 }
deleteBook(idBook:string) {

  this.bookDoc=this.afs.doc<BookInterface>(`books/${idBook}`);

  this.bookDoc.delete().then(()=>
  alert('It was successfully deleted!'),
  err=>alert('Error deleting book'))
 }

}
