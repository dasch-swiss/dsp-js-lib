#!/usr/bin/env bash

# find deactivated tests
hits=`find . -name "*spec.ts" | xargs grep 'fit\|fdescribe\|xdescribe\|xit' | wc -l`
if [ $hits -ne 0 ];
 then
  echo "Deactivated tests found: ", `find . -name "*spec.ts" | xargs grep 'fit\|fdescribe\|xdescribe\|xit'`
  exit 1
fi
