import { parseCsv } from './parser';

const csvData = `23,45.5,"txt",10\n
"txt",0,txt\n`;
const parsedData = [
    [23, 45.5, 'txt', 10],
    ['txt', 0, 'txt'],
];

describe('ParserService', () => {


    it('should parse csv', () => {
        const p = parseCsv(csvData, ',');
        expect(p).toEqual(parsedData);
    });
});
