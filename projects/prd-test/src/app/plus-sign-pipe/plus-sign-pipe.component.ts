import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlusSignPipe } from 'prd-cdk';

@Component({
  selector: 'prd-plus-sign-pipe',
  standalone: true,
  imports: [PlusSignPipe, FormsModule],
  templateUrl: './plus-sign-pipe.component.html',
  styleUrl: './plus-sign-pipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlusSignPipeComponent {
  value = model<any>('');
}
