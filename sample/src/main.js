import {load} from 'aurelia-environment';

export function configure(aurelia) {
  load().then(() => {
    aurelia.use
      .standardConfiguration()
      .developmentLogging();

    aurelia.start().then(a => a.setRoot('src/app'));
  });
}
