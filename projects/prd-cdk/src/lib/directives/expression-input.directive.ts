import {
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { evaluate } from 'simple-math-evaluator';

export type OnBlurAction = 'ignore' | 'calculate';

@Directive({
  selector: 'input[prdExpressionInput]',
  standalone: true,
  host: {
    '(blur)': 'onBlur()',
  },
  exportAs: 'prdExpressionInput',
})
export class ExpressionInputDirective {
  private input = inject(ElementRef).nativeElement as HTMLInputElement;

  private readonly calculated = signal<number | null>(null);
  calculatedValue = this.calculated.asReadonly();

  noCommaSeparator = input(false, {
    transform: booleanAttribute,
    alias: 'prdExpressionNoComma',
  });

  onBlurAction = input<OnBlurAction>('calculate', {
    alias: 'prdExpressionInputOnBlur',
  });

  constructor(ngControl: NgControl) {
    if (ngControl.valueAccessor) {
      this.expressionAccessor(ngControl.valueAccessor);
    }
  }

  onBlur() {
    const calc = this.calculated();
    if (this.onBlurAction() === 'calculate' && typeof calc === 'number') {
      this.input.value = calc.toString();
    }
  }

  private expressionAccessor(valueAccessor: ControlValueAccessor) {
    const original = valueAccessor.registerOnChange;

    valueAccessor.registerOnChange = (fn: (_: unknown) => void) => {
      return original.call(valueAccessor, (value: unknown) => {
        if (typeof value === 'string') {
          this.calculated.set(this.evaluateExpression(value));
          return fn(this.calculated());
        } else {
          return fn(null);
        }
      });
    };
  }

  private evaluateExpression(value: string): number | null {
    try {
      return +evaluate(this.replaceCommas(value));
    } catch (error) {
      if (error instanceof SyntaxError) {
        return null;
      } else {
        throw error;
      }
    }
  }

  private replaceCommas(value: string): string {
    return this.noCommaSeparator()
      ? value
      : value.replace(/(?<=\d),(?=\d)/, '.');
  }
}
