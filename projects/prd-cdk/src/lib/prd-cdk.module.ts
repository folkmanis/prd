import { NgModule } from '@angular/core';
import { HideZeroPipe } from './pipes/hide-zero.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { FilesizePipe } from './pipes/filesize.pipe';
import { ExpressionInputDirective } from './directives/expression-input.directive';
import { PlusSignPipe } from './pipes/plus-sign.pipe';

@NgModule({
  imports: [
    HideZeroPipe,
    ShortenTextPipe,
    FilesizePipe,
    ExpressionInputDirective,
    PlusSignPipe,
  ],
  exports: [
    HideZeroPipe,
    ShortenTextPipe,
    FilesizePipe,
    ExpressionInputDirective,
    PlusSignPipe,
  ],
})
export class PrdCdkModule {}
