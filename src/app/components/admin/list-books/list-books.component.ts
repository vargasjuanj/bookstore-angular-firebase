import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from 'src/app/models/book';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
  books: BookInterface[]
public isAdmin=null
public userUid=null
  constructor(private dataApiService: DataApiService, private authService:AuthService ) {

   }

  ngOnInit() {
    this.getListBooks()
this.currentUser()

  }
  currentUser(){
this.authService.isAuth().subscribe(auth=>{

  if(auth){
this.authService.isUserAdmin(auth.uid).subscribe(
  userRole=>{

    this.isAdmin=userRole.roles.hasOwnProperty('admin')

   this.userUid=userRole.id
  }
)
  }
})
  }

  getListBooks() {
    this.dataApiService.getAllBooks().subscribe(
      result => this.books = result
    )
  }
  onDeleteBook(idBook: string): void {
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApiService.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface) {

    this.dataApiService.selectedBook = Object.assign({}, book)

  }

}
