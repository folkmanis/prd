import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExpressionInputDirective } from 'prd-cdk';

@Component({
  selector: 'prd-input-test',
  standalone: true,
  imports: [
    FormsModule,
    ExpressionInputDirective,
    MatInput,
    MatFormFieldModule,
  ],
  templateUrl: './input-test.component.html',
  styleUrl: './input-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTestComponent {
  value: number | null = 2.3;

  acceptComma = false;
}
