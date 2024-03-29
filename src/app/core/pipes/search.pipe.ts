import { Pipe, PipeTransform } from '@angular/core';
import { NoteData } from './../interfaces/note-data';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(notes: NoteData[], searchTerm: string): NoteData[] {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
