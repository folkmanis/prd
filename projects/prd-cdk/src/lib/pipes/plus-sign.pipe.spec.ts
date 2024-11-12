import { PlusSignPipe } from './plus-sign.pipe';

describe('PlusSignPipe', () => {
  let pipe: PlusSignPipe;

  beforeEach(() => {
    pipe = new PlusSignPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should parse positive number', () => {
    expect(pipe.transform(2)).toBe('+2');
  });

  it('should parse negative number', () => {
    expect(pipe.transform(-2)).toBe('-2');
  });

  it('should parse zero', () => {
    expect(pipe.transform(0)).toBe('0');
  });

  it('should parse numerical string', () => {
    expect(pipe.transform('2')).toBe('+2');
  });

  it('should ignore non-numerical string', () => {
    expect(pipe.transform('abc')).toBe('abc');
  });

  it('should ignore other types', () => {
    expect(pipe.transform(false)).toBe(false);
  });

  it('should ignore empty string', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform('  ')).toBe('  ');
  });
});
