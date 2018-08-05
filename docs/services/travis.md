`travis`
========

Setup
-----

See [the official documentation](https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications) for information on how to enable webhook notifications for your builds.

Config
------

* `service`, required, has to be `travis`.
* `apiRoot`, optional , the root of the API endpoint to use. Defaults to `https://api.travis-ci.org` for open source projects. Use `https://api.travis-ci.com` for the commercial version.
* `states`, required, an object mapping each state to a thing to run. Available states are `started`, `passed`, `failed`, `canceled`, `error`.

`STDIN`
-------

The entire JSON payload is passed to the runnable via `STDIN`.

Environment variables
---------------------

See [the official documentation](https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications) for a detailed description of those values.

* `RESULT`, the result. `0` for success, `1` for failed or incomplete builds.
* `STATE`, one of `started`, `passed`, `failed`, `canceled`, `error`.
* `STATUS_MESSAGE`, a human-friendly description of the builds state, like `Fixed` or `Still Failing`.
* `STATUS`, the current status. `0` for finished builds, `1` for running builds.

Example
-------

```json
{
  "ci": {
    "service": "travis",

    "apiRoot": "https://api.travis-ci.com",
    "states": {
      "passed": "/home/deploybot/destroy_the_world.sh"
    }
  }
}
```
