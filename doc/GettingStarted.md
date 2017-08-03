# Getting started

A simple introduction for the **aurelia-environment** plugin is shown by using the Aurelia demo application [skeleton-navigation](https://github.com/aurelia/skeleton-navigation).

We start by setting up the project. Afterwards, we install and configure the plugin as shown in [Installation](https://github.com/MarcScheib/aurelia-environment/blob/master/doc/Installation.md).

1. Clone the repository into your local project folder:

  ```
  git clone https://github.com/aurelia/skeleton-navigation.git
  ```
2. Switch into the _skeleton-navigation_ directory and choose one of your preferred starter kits. In this example, we choose the _skeleton-es2016_. Switch into that directory and install all _npm_ dependencies:

  ```
  cd skeleton-navigation
  cd skeleton-es2016
  npm install
  ```
3. In the same directory, install the _jspm_ dependencies:

  ```
  jspm install
  ```
4. Install the **aurelia-environment** dependency via _jspm_:

  ```
  jspm install aurelia-environment
  ```

The project is now set up together with the environment plugin and we can start using it. Via executing ```gulp watch``` you can start a server running the application.
It is then available via the shown URL on the command line (e.g. http://localhost:9000).

As early as possible we should now start loading the environment variables. In your favored IDE, open the file _skeleton-navigation/skeleton-es2016/src/main.js_ and adjust it as follows:

```javascript
import {load} from 'aurelia-environment';
import 'bootstrap';

export function configure(aurelia) {
  load().then(() => {
    aurelia.use
      .standardConfiguration()
      .developmentLogging();
  
    //Uncomment the line below to enable animation.
    //aurelia.use.plugin('aurelia-animator-css');
    //if the css animator is enabled, add swap-order="after" to all router-view elements
  
    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    //aurelia.use.plugin('aurelia-html-import-template-loader')
  
    aurelia.start().then(() => aurelia.setRoot());
  });
}
```

We simply wrap Aurelia's bootstrapping into the fulfilled Promise of aurelia-environment. This automatically loads an ```aurelia.env``` file from the base directory of the server and the respective env variables. Those are available via ```window.env``` then. For additional configuration, see the [Configuration](https://github.com/MarcScheib/aurelia-environment/blob/master/doc/Configuration.md).

You can now start using the environment variables, e.g. ```console.log(window.env.ENV1)``` will output the value of the entry with key __ENV1__ from the aurelia.env file.

If you are using the ES2017 `async`/`await` syntax, you can simply wait for `load()`:

```javascript
import {load} from 'aurelia-environment';

export async function configure(aurelia) {
  await load();
  
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
  
  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
```
