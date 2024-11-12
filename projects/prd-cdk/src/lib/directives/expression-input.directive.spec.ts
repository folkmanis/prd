import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  ExpressionInputDirective,
  OnBlurAction,
} from './expression-input.directive';

@Component({
  standalone: true,
  imports: [FormsModule, ExpressionInputDirective],
  template: `<input
      [(ngModel)]="value"
      prdExpressionInput
      [prdExpressionInputOnBlur]="onBlurAction()"
      [prdExpressionNoComma]="noComma()"
      #expressionInput="prdExpressionInput"
    />
    <div calculatedUpdate>{{ expressionInput.calculatedUpdate() }}</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  value: number | null = null;
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
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
    input = fixture.nativeElement.querySelector('input');
  });

  it('should create an instance', () => {
    expect(input).toBeTruthy();
  });

  it('input value should be empty initialy', () => {
    expect(input.value).toBe('');
  });

  it('input should contain entered expression', async () => {
    await setInput('2*2');
    expect(input.value).toBe('2*2');
  });

  it('Should calculate valid expression', async () => {
    await setInput('2*2.1');
    expect(component.value).toBe(4.2);
  });

  it('Should accept comma as separator', async () => {
    await setInput('2*2,1');
    expect(component.value).toBe(4.2);
  });

  it('Should accept comma as separator', async () => {
    component.noComma.set(true);
    await fixture.whenStable();
    await setInput('2*2,1');
    expect(component.value).toBeNull();
  });

  it('should update input on blur', async () => {
    component.onBlurAction.set('calculate');
    await setInput('2*2');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(input.value).toBe('4');
  });

  it('should not update input on blur', async () => {
    component.onBlurAction.set('ignore');
    await setInput('2*2');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(input.value).toBe('2*2');
  });

  it('Should produce null on invalid expression', async () => {
    await setInput('2*2');
    await setInput('2*2+');
    expect(component.value).toBeNull();
  });

  it('Should emit updated value', async () => {
    await setInput('2*2');
    expect(
      fixture.nativeElement.querySelector('[calculatedUpdate]').innerText
    ).toBe('4');
  });

  it('Should emit updated value', async () => {
    await setInput('2*2');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(
      fixture.nativeElement.querySelector('[calculatedUpdate]').innerText
    ).toBe('');
  });

  async function setInput(value: string) {
    input.value = value;
    input.dispatchEvent(new InputEvent('input'));
    await fixture.whenStable();
  }
});
