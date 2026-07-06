import { beforeEach, describe, expect, it } from 'vitest';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { form, FormField } from '@angular/forms/signals';
import {
  ExpressionInputDirective,
  OnBlurAction,
} from './expression-input.directive';

@Component({
  standalone: true,
  imports: [FormField, ExpressionInputDirective],
  template: `<input
      [formField]="form.expression"
      prdExpressionInput
      [prdExpressionInputOnBlur]="onBlurAction()"
      [prdExpressionNoComma]="noComma()"
      #expressionInput="prdExpressionInput"
    />
    <div calculatedUpdate>{{ expressionInput.calculatedUpdate() }}</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  formModel = signal({ expression: '' });
  form = form(this.formModel);
  onBlurAction = signal<OnBlurAction>('calculate');
  noComma = signal(false);
}

describe('ExpressionInputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
    input = fixture.nativeElement.querySelector('input');
  });

  it('should create an instance', () => {
    expect(input).toBeTruthy();
  });

  it('should contain calculated value element', () => {
    const calculatedUpdate =
      fixture.nativeElement.querySelector('[calculatedUpdate]');
    expect(calculatedUpdate).toBeTruthy();
    expect(calculatedUpdate.textContent).toBe('');
  });

  it('input value should be empty initialy', () => {
    expect(input.value).toBe('');
  });

  it('input should contain entered expression', async () => {
    await setInput('2*2');
    expect(input.value).toBe('2*2');
  });

  it('Should accept comma as separator', async () => {
    await setInput('2*2,1');
    expect(input.value).toBe('2*2.1');
  });

  it('Should not accept comma as separator', async () => {
    component.noComma.set(true);
    await fixture.whenStable();
    await setInput('2*2,1');
    expect(input.value).toBe('2*2,1');
  });

  it('should update input on blur', async () => {
    component.onBlurAction.set('calculate');
    await setInput('2*2');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(input.value).toBe('4');
  });

  it('should not update input on blur when set to ignore', async () => {
    component.onBlurAction.set('ignore');
    await setInput('2*2');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(input.value).toBe('2*2');
  });

  it('Should update form value on blur', async () => {
    await setInput('2*2');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(component.form.expression().value()).toBe('4');
  });

  it('Should form value reflect invalid value too', async () => {
    await setInput('2*2');
    await setInput('2*2+');
    expect(component.form.expression().value()).toBe('2*2+');
  });

  it('Should emit display value', async () => {
    await setInput('2*2');
    expect(
      fixture.nativeElement.querySelector('[calculatedUpdate]').textContent,
    ).toBe('4');
  });

  it('Should reset display value', async () => {
    await setInput('2*2');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(
      fixture.nativeElement.querySelector('[calculatedUpdate]').textContent,
    ).toBe('');
  });

  async function setInput(value: string) {
    input.value = value;
    input.dispatchEvent(new InputEvent('input'));
    await fixture.whenStable();
  }
});
