import { NgModule } from '@angular/core';
import { PrdCdkComponent } from './prd-cdk.component';
import { HideZeroPipe } from './pipes/hide-zero.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { FilesizePipe } from './pipes/filesize.pipe';


@NgModule({
  declarations: [
    PrdCdkComponent,
    HideZeroPipe,
    ShortenTextPipe,
    FilesizePipe,
  ],
  imports: [
  ],
  exports: [
    PrdCdkComponent,
    HideZeroPipe,
    ShortenTextPipe,
    FilesizePipe,
  ]
})
export class PrdCdkModule { }
