import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { evaluate } from 'simple-math-evaluator';

export type OnBlurAction = 'ignore' | 'calculate';

@Directive({
  selector: 'input[prdExpressionInput]',
  standalone: true,
  host: {
    inputmode: 'numeric',
    '(blur)': 'onBlur()',
    '(input)': 'onInput()',
  },
  exportAs: 'prdExpressionInput',
})
export class ExpressionInputDirective {
  private el = inject(ElementRef<HTMLInputElement>);
  private syncing = false;

  private readonly calculated = signal<number | null>(null);
  calculatedValue = this.calculated.asReadonly();

  calculatedUpdate = computed(() => {
    return this.calculated()?.toString() ?? '';
  });

  noCommaSeparator = input(false, {
    transform: booleanAttribute,
    alias: 'prdExpressionNoComma',
  });

  onBlurAction = input<OnBlurAction>('calculate', {
    alias: 'prdExpressionInputOnBlur',
  });

  onInput() {
    if (this.syncing) return;

    const input = this.el.nativeElement;
    const value = input.value;

    const replaced = this.replaceCommas(value);

    this.calculated.set(this.evaluateExpression(replaced));

    if (replaced === value) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    this.syncing = true;

    input.value = replaced;

    if (start !== null && end !== null) {
      queueMicrotask(() => input.setSelectionRange(start, end));
    }

    input.dispatchEvent(new Event('input', { bubbles: true }));
    this.syncing = false;
  }

  onBlur() {
    const input = this.el.nativeElement;
    const value = input.value;

    const replaced = this.replaceCommas(value);

    const calc = this.evaluateExpression(replaced);

    if (
      this.onBlurAction() === 'calculate' &&
      typeof calc === 'number' &&
      calc.toString() !== value
    ) {
      input.value = calc.toString();
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    this.calculated.set(null);
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
