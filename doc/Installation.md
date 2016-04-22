# Installation

## Plugin Installation via JSPM

The plugin installation happens via JSPM. Go to your project and verify npm (```npm install```) and jspm (```jspm install```) installation was already executed.

Now, you can install the environment plugin via the following command:

```
jspm install aurelia-environment
```

The command will add the plugin source code to your _jspm_packages_ directory as well as a mapping into your _config.js_ which looks similar to the following:

```
"aurelia-environment": "github:MarcScheib/aurelia-environment@x.y.z"
```

You can also add a specific branch to your application if you are looking for technical previews by executing the following command:

```
jspm install aurelia-environment=github:MarcScheib/aurelia-environment@master
```

This will add the current _master_ branch instead of the latest tagged version.


## Bring Your Own Polyfill

This plugin relies on the Fetch API, which is not yet supported by all popular browsers. However, this library does not include a polyfill for Fetch. If you need to support [browsers that haven't implemented Fetch](http://caniuse.com/#feat=fetch), you will need to install a polyfill like [GitHub's Fetch polyfill](https://github.com/github/fetch).

You can install the polyfill via:

```
jspm install fetch
```

Then, make sure to load the polyfill before using **aurelia-environment**:

```js
import 'fetch';
import {load} from 'aurelia-environment';
```
