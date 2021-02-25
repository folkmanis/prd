import { TestBed } from '@angular/core/testing';

import { ParserService } from './parser.service';

const csvData = `23,45.5,"txt",10\n
"txt",0,txt\n`;
const parsedData = [
  [23, 45.5, 'txt', 10],
  ['txt', 0, 'txt'],
];

describe('ParserService', () => {
  let service: ParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have class methods', () => {
    expect(service.parseCsv).toBeTruthy();
  });

  it('should parse csv', () => {
    const p = service.parseCsv(csvData, ',');
    expect(p).toEqual(parsedData);
  });
});
