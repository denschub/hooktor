`generic`
========

This is a very simple handler allowing you to handle validation and body parsing yourself.

Config
------

* `service`, required, has to be `generic`.
* `secret`, optional, the shared secret token passed via the `X-Hook-Token` header. Can be one single secret (as a string) or multiple secrets (as an array of string).
* `run`, required, the command/script to execute.

`STDIN`
-------

The entire payload is passed to the runnable via `STDIN`.

Example
-------

```json
{
  "example": {
    "service": "generic",

    "secret": "supersecretsecret",
    "run": "/home/automation/close_window_if_rainy.sh"
  }
}
```
