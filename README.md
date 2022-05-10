# example-percy-puppeteer

See original here: https://github.com/percy/example-percy-puppeteer

# Purpose of this repo
Example setup for Percy/Jest/Puppeteer/jest-puppeteer together to run Percy builds.

~~Provided example app from Percy with jest-puppeter instead of mocha runner.
Currently: Percy tests hang on forever if run.

~~P.S. 
There are tests without percySnapshot which work as expected. Which makes me think issue is not in jest/jest-puppeteer libs.

# Install
- Clone
- Run `npm i`

# Run all tests
`npm run test`

# Run jest-puppeteer with Percy

- `npm run test todomvc_jest_spec.js` -> Jest-only tests (no `percySnapshot` calls)
- `npm run test todomvc_spec.js` -> Jest + Percy tests    
