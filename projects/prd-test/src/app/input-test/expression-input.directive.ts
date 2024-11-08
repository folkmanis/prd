import {
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  input,
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
})
export class ExpressionInputDirective {
  private input = inject(ElementRef).nativeElement as HTMLInputElement;
  private calculated: number | null = null;

  allowCommaSeparator = input(false, {
    transform: booleanAttribute,
    alias: 'prdExpressionInputComma',
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
    if (
      this.onBlurAction() === 'calculate' &&
      typeof this.calculated === 'number'
    ) {
      this.input.value = this.calculated.toString();
    }
  }

  private expressionAccessor(valueAccessor: ControlValueAccessor) {
    const original = valueAccessor.registerOnChange;

    valueAccessor.registerOnChange = (fn: (_: unknown) => void) => {
      return original.call(valueAccessor, (value: unknown) => {
        if (typeof value === 'string') {
          this.calculated = this.evaluateExpression(value);
          return fn(this.calculated);
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
    return this.allowCommaSeparator()
      ? value.replace(/(?<=\d),(?=\d)/, '.')
      : value;
  }
}
