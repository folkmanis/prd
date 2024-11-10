# PrdCdk

Library to be used internally for prd projects

Contains Angular pipes, components and RxJS functions

## directives

### prdExpressionInput

Usage:
input[prdExpressionInput]

exportAs: 'prdExpressionInput'

allowCommaSeparator = input(false, {
transform: booleanAttribute,
alias: 'prdExpressionNoComma',
});

onBlurAction = input<OnBlurAction>('calculate', {
alias: 'prdExpressionInputOnBlur',
});

type OnBlurAction = 'ignore' | 'calculate';

## pipes

- filesize
- hideZero
- shortenText

## RxJS

- cacheWithUpdate
- log
