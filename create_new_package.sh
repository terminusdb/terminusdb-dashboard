#!/bin/bash

PACKAGENAME="$1"
PACKAGENAME_CAMELCASE=$(echo "$PACKAGENAME" | sed -r 's/(^|-)(\w)/\U\2/g')
PACKAGE_DIR="packages/$PACKAGENAME"

if [ -z "$1" ]
then
    echo "Please provide a package name like this: $0 react-test-package"
    exit 2
fi

cp -r packages/react-pretty-print "$PACKAGE_DIR"
sed -i "s/react-pretty-print/${PACKAGENAME}/g" "${PACKAGE_DIR}/package.json"
mv "$PACKAGE_DIR/src/JsonPrint.js" "${PACKAGE_DIR}/src/${PACKAGENAME_CAMELCASE}.js"
sed -i "s/react-pretty-print/${PACKAGENAME}/g" "${PACKAGE_DIR}/package.json"
sed -i "s/JsonPrint/${PACKAGENAME_CAMELCASE}/g" "${PACKAGE_DIR}/src/${PACKAGENAME_CAMELCASE}.js"
sed -i "s/JsonPrint/${PACKAGENAME_CAMELCASE}/g" "${PACKAGE_DIR}/src/index.js"
sed -i "s/JsonPrint/${PACKAGENAME_CAMELCASE}/g" "${PACKAGE_DIR}/src/index.js"
sed -i "s/react-pretty-print/${PACKAGENAME}/g" "${PACKAGE_DIR}/webpack.config.js"
sed -i "s/ReactPrettyPrint/${PACKAGENAME_CAMELCASE}/g" "${PACKAGE_DIR}/webpack.config.js"
