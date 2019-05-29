# Cross platform controller

Using Ionic magic, develop once and export to iOS or Android with Angular. The goal of this project is to support the functionality of Arduino based devices which they connect into a server. For the communication layer is being used sockets as also Rest API. With that being said for the data management [NGXS](https://ngxs.gitbook.io/ngxs/) was used as a more easier approach compared to Rxjs which sometimes is too much. Also it's integrated [NG-Zorro](https://ng.ant.design/docs/introduce/en) for more cool ready to use components, as also [Angular-Material](https://material.angular.io/) for more awesomeness. 

This project was generated with [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/)
version 5.3.0

# Important 

This project was made as a showcase and only that. It will not dynamically gonna control any Arduino based devices. It requires a specific functionality for the Arduinos, as also the server behind all to rule them all.

# Let's go
1. Go to project folder and install dependencies:
 ```sh
 npm install
 ```

2. Launch development server, and open `localhost:4200` in your browser:
 ```sh
 npm start
 ```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Task                            | Description
--------------------------------|--------------------------------------------------------------------------------------
`npm start`                     | Run development server on `http://localhost:4200/`
`npm run serve:sw`              | Run test server on `http://localhost:4200/` with service worker enabled
`npm run build [-- --configuration=production]` | Lint code and build web app for production (with [AOT](https://angular.io/guide/aot-compiler)) in `www/` folder
`npm run cordova:prepare`       | Prepare for building mobile app (restore Cordova platforms and plugins)
`npm run cordova:run <ios/android> [--device]`          | Run app on target platform device or simulator
`npm run cordova:build [-- --configuration=production]` | Build mobile app for production in `dist/` folder
`npm run cordova:clean`         | Removes `www/`, `platforms/` and `plugins/` folders
`npm test`                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode
`npm run test:ci`               | Lint code and run unit tests once for continuous integration
`npm run e2e`                   | Run e2e tests using [Protractor](http://www.protractortest.org)
`npm run lint`                  | Lint code
`npm run translations:extract`  | Extract strings from code and templates to `src/app/translations/template.json`
`npm run docs`                  | Display project documentation
`npm run prettier`              | Automatically format all `.ts`, `.js` & `.scss` files

#### Tools

Development, build and quality processes are based on [angular-cli](https://github.com/angular/angular-cli) and
[NPM scripts](https://docs.npmjs.com/misc/scripts), which includes:

- Optimized build and bundling process with [Webpack](https://webpack.github.io)
- [Development server](https://webpack.github.io/docs/webpack-dev-server.html) with backend proxy and live reload
- Cross-browser CSS with [autoprefixer](https://github.com/postcss/autoprefixer) and
  [browserslist](https://github.com/ai/browserslist)
- Asset revisioning for [better cache management](https://webpack.github.io/docs/long-term-caching.html)
- Unit tests using [Jasmine](http://jasmine.github.io) and [Karma](https://karma-runner.github.io)
- End-to-end tests using [Protractor](https://github.com/angular/protractor)
- Static code analysis: [TSLint](https://github.com/palantir/tslint), [Codelyzer](https://github.com/mgechev/codelyzer),
  [Stylelint](http://stylelint.io) and [HTMLHint](http://htmlhint.com/)
- Local knowledgebase server using [Hads](https://github.com/sinedied/hads)
- Automatic code formatting with [Prettier](https://prettier.io)

#### Libraries

- [Angular](https://angular.io)
- [Ionic](http://ionicframework.com)
- [Ionic Native](https://ionicframework.com/docs/native/)
- [Ngxs](https://ngxs.gitbook.io/ngxs/)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)
- [NG-zorro](https://ng.ant.design/docs/introduce/en)
