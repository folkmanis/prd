import { NgModule } from '@angular/core';
import { PrdCdkComponent } from './prd-cdk.component';
import { HideZeroPipe } from './pipes/hide-zero.pipe';



@NgModule({
  declarations: [
    PrdCdkComponent,
    HideZeroPipe
  ],
  imports: [
  ],
  exports: [
    PrdCdkComponent,
    HideZeroPipe,
  ]
})
export class PrdCdkModule { }
