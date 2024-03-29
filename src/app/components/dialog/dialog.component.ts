import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteData } from 'src/app/core/interfaces/note-data';
import { NoteDataService } from 'src/app/core/services/note-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(
    private _NoteDataService: NoteDataService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData
  ) {
    console.log(data);
  }
  noteForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title ? this.data.title : ''),
    content: new FormControl(this.data.content ? this.data.content : ''),
  });
  handelUserAction(form: FormGroup): void {
    if (!this.data.title && !this.data.content) {
      this.addNote(form.value);
    } else {
      this.updateNote(form.value);
    }
  }
  addNote(note: NoteData): void {
    this._NoteDataService.addNote(note).subscribe({
      next: (response) => {
        if (response.msg === 'done') {
          console.log(response);
          this.dialogRef.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.msg,
            text: 'Your Note is Added ...',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
        });
      },
    });
  }

  updateNote(note: NoteData): void {
    this._NoteDataService.editNote(note, this.data._id).subscribe({
      next: (response) => {
        if (response.msg === 'done') {
          console.log(response);
          this.dialogRef.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.msg,
            text: 'Your Note is Updated ...',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
        });
      },
    });
  }
}
