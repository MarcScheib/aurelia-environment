# Usage

## Basic

aurelia.env
```bash
ENV1 = VALUE
```

example.js
```javascript
import {load} from 'aurelia-environment';

load().then(() => {
  console.log(window.env.ENV1); // outputs VALUE
});

console.log(window.env.ENV1); // outputs VALUE as well
```

## Syntax

### Assignment

To assign values, the syntax is `key = value`. However, all of the assignments below are valid:
```bash
TEST1 = value
TEST2= VALUE
TEST3 =VALUE
TEST4=VALUE
 TEST5 = VALUE
TEST6  =   VALUE
```
