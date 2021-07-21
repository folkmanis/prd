import { NgModule } from '@angular/core';
import { HideZeroPipe } from './pipes/hide-zero.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { FilesizePipe } from './pipes/filesize.pipe';


@NgModule({
  declarations: [
    HideZeroPipe,
    ShortenTextPipe,
    FilesizePipe,
  ],
  imports: [
  ],
  exports: [
    HideZeroPipe,
    ShortenTextPipe,
    FilesizePipe,
  ]
})
export class PrdCdkModule { }
