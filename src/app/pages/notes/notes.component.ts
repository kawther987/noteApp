import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NoteDataService } from './../../core/services/note-data.service';
import { NoteData } from './../../core/interfaces/note-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notesArr: NoteData[] = [];
  searchKey: string = '';
  constructor(
    public dialog: MatDialog,
    private _NoteDataService: NoteDataService
  ) {}

  openDialog(noteData?: NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '330px',
      width: '600px',
      data: {
        title: noteData?.title,
        content: noteData?.content,
        _id: noteData?._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserNotes();
    });
  }

  ngOnInit(): void {
    this.getUserNotes();
  }
  getUserNotes(): void {
    this._NoteDataService.getNotes().subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this.notesArr = res.notes;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteNote(id: string, index: number): void {
    console.log(id, index);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          this._NoteDataService.deleteNote(id).subscribe({
            next: (res) => {
              console.log(res);
              if (res.msg === 'done') {
                this.notesArr.splice(index, 1);
                this.getUserNotes();
              }
            },
          });
        });
      }
    });
  }

  updateNote(note: NoteData, index: number): void {
    console.log(note, index);
    this.openDialog({
      title: note.title,
      content: note.content,
      _id: note._id,
    });
  }
}
