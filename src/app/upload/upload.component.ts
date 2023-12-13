import { Component, Input, Output, EventEmitter } from '@angular/core';
import { S3Service } from '../s3.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @Output() dataEvent = new EventEmitter<any>();
  selectedFile: File | null = null;
  resultText = '';
  imageUrl = '';
  showImg = false;
  isLoading = false

  constructor(private s3Service: S3Service) {}

  onFileSelected(event: any) {
    this.isLoading = true;
    this.selectedFile = event.target.files[0];
    this.resultText = `Upload has started.`;
    this.dataEvent.emit(this.selectedFile);
    this.uploadFile();
  }

  async uploadFile() {
    if (this.selectedFile) {
      try {
        await this.s3Service.uploadFile(this.selectedFile);
        this.resultText = `${this.selectedFile.name} has been successfully uploaded.`;
        this.imageUrl = `https://final-project-sn.s3.amazonaws.com/${this.selectedFile.name}`;
        this.showImg = true;
        this.isLoading = false;

      } catch (error) {
        this.resultText = `Error: ${error}`;
        this.showImg = false;
        this.isLoading = false;
      }
    }
  }

}
