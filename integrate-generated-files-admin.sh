#!/usr/bin/env bash
set -e

usage() {
  echo "Usage: $0 <generated-files-dir>" 1>&2;
  echo "Run this script from project root: ./integrate-generated-files-admin.sh"
  exit 1;
  }

if [ $# -eq 1 ] && [ -d $1 ]
then
  cp -r $1/api/admin/ ./src/api/admin/
  cp -r $1/models/admin/ ./src/models/admin/
  cp -r $1/test-data/admin/ ./test/data/api/admin/
else
  usage
fi
