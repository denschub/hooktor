`generic`
========

This is a very simple handler allowing you to handle validation and body parsing yourself.

Config
------

* `service`, required, has to be `generic`.
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
    "run": "/home/automation/close_window_if_rainy.sh"
  }
}
```
