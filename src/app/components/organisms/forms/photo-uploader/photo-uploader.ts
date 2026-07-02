import { Component, output, signal, WritableSignal } from '@angular/core';
import { PhotoUploaderEvent as PUEvent } from './photo-uploader.config';
import { Icon } from "../../../atoms/icon/icon";
import { Button } from "../../../atoms/button/button";

@Component({
  selector: 'organism-photo-uploader',
  imports: [Icon, Button, ],
  templateUrl: './photo-uploader.html',
  styleUrl: './photo-uploader.css',
})
export class PhotoUploader {
  protected dragEvent     = signal<PUEvent>(PUEvent.DRAG);
  protected photoPreviews = signal<string[]>(["", "", "", ""]);
  private   files         = signal<(File | null)[]>([null, null, null, null]); 
  readonly  photoFiles    = output<(File | null)[]>();
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragEvent.set(PUEvent.DRAG_OVER)
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragEvent.set(PUEvent.DRAG_LEAVE);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragEvent.set(PUEvent.DRAG_LEAVE);
    const files = event.dataTransfer?.files;
    this.addPhotos(files);
  }

  protected onSelect(event:Event){
    const input = event.target as HTMLInputElement;
    this.addPhotos(input.files) ;
    input.value = '';
  }

  protected selectFile(event:Event, index:number){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.updatePhoto(input.files[0], index); 
    }
    input.value = '';
  }


  protected addPhotos(files: FileList | undefined | null) {
    if (!files) return;

    for (const file of files) {
      const freeIndex = this.files().findIndex(f => f === null);
      if (freeIndex === -1) break; 
      
      this.photoPreviews.update(current =>
        current.map((p, i) => i === freeIndex ? URL.createObjectURL(file) : p)
      );

      this.files.update(current =>
        current.map((f, i) => i === freeIndex ? file : f)
      );
    }
    this.photoFiles.emit(this.files());
  }

  protected updatePhoto(file: File | undefined | null , index: number) {
    if(file){
      const preview_url = URL.createObjectURL(file);
      this.photoPreviews.update(current => [...current.slice(0, index), preview_url, ...current.slice(index + 1)]);
      this.files.update(current => [...current.slice(0, index), file, ...current.slice(index + 1)]);
      this.photoFiles.emit(this.files())
    }  
  }

  protected removePhoto(index: number) {
    URL.revokeObjectURL(this.photoPreviews()[index]); // libera memoria
    this.photoPreviews.update(photos => {
      photos[index] = ""; 
      return [...photos];
    } );

    this.files.update(files => {
      files[index] = null; 
      return [...files];
    } );
    this.photoFiles.emit(this.files());
  }

}

