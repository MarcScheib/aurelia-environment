# FAQ

### Should I commit my *.env* file?

No. The *.env* file should not be version controlled. Your *.env* will differ depending on deployment point, e.g. development will have different API endpoints compared to production. However, you can commit an example file which allows easy modification for e.g. CI builds.

### Should I have multiple `.env` files?

No. Your *.env* should vary between deploys and you should not be sharing values between environments.

Also, see [The Twelve-Factor App](http://12factor.net/config) for more information.
