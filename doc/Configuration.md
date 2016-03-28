# Configuration

The plugin allows to configure which .env file to load.

## Configuration Parameters

The **aurelia-notification** plugin provides the following configuration parameters:
- `path`
  - Specifies the path to the directory containing the .env file.
  - **Default**: './'
- `file` 
  - Specifies the .env file to load.
  - **Default**: 'aurelia.env'

Configuration parameters are handed over to the plugin when calling ```load()```.
The following snippet shows how to change the path and the file that is loaded on startup:

```javascript
import {load} from 'aurelia-environment';
import 'bootstrap';

export function configure(aurelia) {
  load({path: 'config/', file: '.env'}).then(() => {
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
