#!/usr/bin/env bash

# Find deactivated or focused tests
# Jasmine patterns: fit, fdescribe, xdescribe, xit
# Jest patterns: it.only, test.only, describe.only, it.skip, test.skip, describe.skip
hits=`find . -name "*spec.ts" -not -path "./node_modules/*" | xargs grep -E 'fit\(|fdescribe\(|xdescribe\(|xit\(|\.only\(|\.skip\(' | wc -l`
if [ $hits -ne 0 ];
 then
  echo "Deactivated or focused tests found:"
  find . -name "*spec.ts" -not -path "./node_modules/*" | xargs grep -E 'fit\(|fdescribe\(|xdescribe\(|xit\(|\.only\(|\.skip\('
  exit 1
fi
