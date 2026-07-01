import { Component, output, signal } from '@angular/core';
import { PhotoUploaderEvent as PUEvent } from './photo-uploader.config';
import { Icon } from "../../atoms/icon/icon";
import { Button } from "../../atoms/button/button";

@Component({
  selector: 'organism-photo-uploader',
  imports: [Icon, Button],
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
    const files = event.dataTransfer?.files;
    this.uploadPhotoList(files);
  }

  protected onChange(event:Event){
    const input = event.target as HTMLInputElement;
    this.uploadPhotoList(input.files) 
    // Resetea el input para permitir seleccionar el mismo archivo otra vez
    input.value = '';
  }

  protected selectFile(event:Event, index:number){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addPhoto(input.files[0], index); 
    }
     // Resetea el input para permitir seleccionar el mismo archivo otra vez
    input.value = '';
  }


  protected uploadPhotoList(files: FileList | undefined | null) {
    if(files){
      for (let i=0; i<files.length; i++) {
        if (files.length>this.photoPreviews().length) return;
        const preview_url = URL.createObjectURL(files[i]);

        this.photoPreviews.update(current => {
          const freeIndex = current.findIndex(p => !p); // primer slot vacío/null/""
          if (freeIndex === -1) return current; // no hay sitio libre, no hace nada
          return current.map((p, i) => i === freeIndex ? preview_url : p);
        });

        this.files.update(current => {
          const freeIndex = current.findIndex(p => !p); // primer slot vacío/null/""
          if (freeIndex === -1) return current; // no hay sitio libre, no hace nada
          return current.map((p, i) => i === freeIndex ? files[i] : p);
        });

        this.photoFiles.emit(this.files())
      }  
    }
  }

  protected addPhoto(file: File | undefined | null , index: number) {
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
