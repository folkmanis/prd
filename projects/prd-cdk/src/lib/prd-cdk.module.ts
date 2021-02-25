import { NgModule } from '@angular/core';
import { PrdCdkComponent } from './prd-cdk.component';
import { HideZeroPipe } from './pipes/hide-zero.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';



@NgModule({
  declarations: [
    PrdCdkComponent,
    HideZeroPipe,
    ShortenTextPipe,
  ],
  imports: [
  ],
  exports: [
    PrdCdkComponent,
    HideZeroPipe,
    ShortenTextPipe,
  ]
})
export class PrdCdkModule { }
