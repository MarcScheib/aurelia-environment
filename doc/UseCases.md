# Use Cases

The **aurelia-environment** plugin is ideally suited for decoupling configuration properties of your application from the source code. For example, during the development phase, you are using development logging printing a lot of information. By relying on Continuous Integration and Delivery, the application is built automatically with each release commit to the VCS. The source code is bundled and configuration is included as is, most of the time with development configuration.

**aurelia-environment** allows to specify the configuration in an extra file. It is easily exchangeable depending on the deployment environment. It is even possible to simply generate it via cli.

The following sections list some example use cases on where to use the plugin

## Use Case #1: API Endpoints

TBD

## Use Case #2: Application Logging

During development, you may prefer to have a more verbose logging than in production. Changing the settings in the code depending on the environment is an annoying task.

Instead, you can use an **.env** file to specify the logging. 

See the following example for Aurelia. In your environment file, specify the logging as follows:

```
LOG_LEVEL=4 # Debug log level
```

Then, in the application configuration, use this environment property instead of hard coding the log level:

```javascript
import {load} from 'aurelia-environment';
import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

export function configure(aurelia) {
  load().then(() => {
    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(env.LOG_LEVEL);

    // aurelia config and bootstrapping ...
  })
  .catch(error => {
    console.error('Cannot load environment: ' + error.status + ' ' + error.statusText);
  });
}
```

In your production environment, you can now deploy the same code. You don't have to touch it again. The only thing you need to do is switching the log level in your environment file.

```
LOG_LEVEL=0 # No Logging
```
