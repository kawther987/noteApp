import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteData } from '../interfaces/note-data';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NoteDataService {
  constructor(private _HttpClient: HttpClient) {}

  token: any = { token: localStorage.getItem('uToken') || '' };

  addNote(data: NoteData): Observable<any> {
    return this._HttpClient.post(`${environment.noteUrl}`, data, {
      headers: this.token,
    });
  }

  editNote(data: NoteData, noteId: string): Observable<any> {
    return this._HttpClient.put(`${environment.noteUrl}/${noteId}`, data, {
      headers: this.token,
    });
  }

  getNotes(): Observable<any> {
    return this._HttpClient.get(`${environment.noteUrl}`, {
      headers: this.token,
    });
  }

  deleteNote(noteId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.noteUrl}/${noteId}`, {
      headers: this.token,
    });
  }
}
