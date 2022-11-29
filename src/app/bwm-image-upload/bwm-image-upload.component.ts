import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-bwm-image-upload',
  templateUrl: './bwm-image-upload.component.html',
  styleUrls: ['./bwm-image-upload.component.scss']
})

export class BwmImageUploadComponent {

  selectedFile: ImageSnippet | undefined;
  
  constructor(private imageService : ImageService) { }
 
  // private onSuccess() {
  //   this.selectedFile?.pending = false;
  //   this.selectedFile?.status = 'ok';
  // }
 

  // private onError(){
  //   this.selectedFile?.pending = false;
  //   this.selectedFile?.status = 'fail';
  //   this.selectedFile?.src ='';

  // }

  processFile(imgInput :  any) {
    const file : File = imgInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) =>{
      this.selectedFile = new ImageSnippet(event.target.result,file);
      this.selectedFile.pending = true;
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) =>{
      //     this.onSuccess();
      //   },
      //   (err) =>{
      //     this.onError();
      //   }
      // )
    })
  }

}
