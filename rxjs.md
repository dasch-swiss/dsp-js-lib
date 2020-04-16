# Use of RxJS

## Introduction

This library heavily depends on `RxJS`.
This document lists all uses of `RxJS` to facilitate upgrading to 
[future versions](https://github.com/ReactiveX/rxjs/blob/master/CHANGELOG.md) 
of `RxJS` which might have breaking changes.

## Imports from RxJS

- from `rxjs`:    
   - `AsyncSubject`
   - `forkJoin`
   - `throwError`
   - `of`
   - `Observable`

- from `rxjs/ajax`:
    - `ajax`
    - `AjaxError`
    - `AjaxResponse`
    
- from `rxjs/operators`:
    - `catchError`
    - `map`
    - `mergeMap`
    - `take`

