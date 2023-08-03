import { Component, EventEmitter, Input, Output } from '@angular/core';
interface fileItems {
  file: File | null;
  thumb: string;
  featured: boolean;
}
@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
})
export class FileSelectorComponent {
  @Input() multiple: boolean = false;
  @Output() onImageSelect = new EventEmitter();

  fileList: fileItems[] = [];

  constructor() {}

  handleFileChange(file: HTMLInputElement) {
    if (file.files?.length) {
      if (this.multiple) {
        for (let i = 0; i < file.files?.length; i++) {
          this.createImageObject(file.files.item(i));
        }
      } else {
        this.createImageObject(file.files.item(0));
      }
    }
  }

  onSelect(imgIndex: number) {
    this.fileList.forEach((i) => (i.featured = false));
    this.fileList[imgIndex].featured = true;
    this.onImageSelect.emit(this.formateResponse(this.fileList));
  }

  remove(index: number) {
    this.fileList.splice(index, 1);
    this.onImageSelect.emit(this.formateResponse(this.fileList));
  }

  createImageObject(file: any) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file as Blob);
    fileReader.addEventListener('load', (data) => {
      if (this.multiple) {
        if (this.fileList.length == 0) {
          this.fileList.push({
            file: file,
            thumb: data.target?.result as string,
            featured: true,
          });
        } else {
          this.fileList.push({
            file: file,
            thumb: data.target?.result as string,
            featured: false,
          });
        }
      } else {
        this.fileList[0] = {
          file: file,
          thumb: data.target?.result as string,
          featured: false,
        };
      }
      this.onImageSelect.emit(this.formateResponse(this.fileList));
    });
  }

  formateResponse(fileList: fileItems[]) {
    return fileList.map((item) => ({
      file: item.file,
      featured: item.featured,
    }));
  }

  formatBytes(size: number, decimals = 2) {
    if (size === 0) return '0 bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
