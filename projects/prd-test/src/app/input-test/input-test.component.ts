import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpressionInputDirective } from './expression-input.directive';

@Component({
  selector: 'prd-input-test',
  standalone: true,
  imports: [FormsModule, ExpressionInputDirective],
  templateUrl: './input-test.component.html',
  styleUrl: './input-test.component.scss',
})
export class InputTestComponent {
  value: string | null = null;

  acceptComma = false;
}
