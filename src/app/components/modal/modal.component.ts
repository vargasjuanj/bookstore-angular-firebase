import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BookInterface } from '../../models/book';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
@ViewChild('btnClose',{static:true}) btnClose:ElementRef

@Input() userUid:string
  constructor(private dataApiService: DataApiService) { }

  ngOnInit() {
  }
  onSaveBook(bookForm: NgForm): void {

    if (bookForm.value.id == null) {
     bookForm.value.userUid=this.userUid
      this.dataApiService.addBook(bookForm.value)

    } else {
      this.dataApiService.updateBook(bookForm.value)
    }
    bookForm.resetForm()
    this.btnClose.nativeElement.click()

  }

resetForm(bookForm:NgForm){
  bookForm.resetForm()
}
}
