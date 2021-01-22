{`Replace /Users/alan/app/nacho/ by https://github.com/alan345/nacho/tree/master/`}

js to ts files:
https://gist.github.com/afternoon/9022899
`find /Users/alan/Documents/app/nacho/react/src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.tsx"' {} \;`
`find /Users/alan/Documents/app/nacho/react/src -name "*.tsx" -exec sh -c 'mv "$0" "${0%.tsx}.js"' {} \;`
