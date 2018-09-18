`gitlab`
========

Setup
-----

See [GitLabs official documentation](https://gitlab.com/help/user/project/integrations/webhooks) for information on how to create a new webhook in your repo, user, or group.

Config
------

* `service`, required, has to be `gitlab`.
* `secret`, optional (but recommended), the shared secret token between GitLab and the hook receiver.
* `events`, required, an object mapping each event to a thing to run. See [GitLabs documentation](https://gitlab.com/help/user/project/integrations/webhooks) for a list of all avialable events.

`STDIN`
-------

The entire payload is passed to the runnable via `STDIN`.

Environment variables
---------------------

* Available for all events:
  * `EVENT`, the event triggered.
* Available for `Merge Request Hook` events:
  * `ACTION`, the action executed on the MR.
  * `MR`, the Merge Request number.
* Available for `push` events:
  * `REF`, the rev that received a push.

Example
-------

```json
{
  "example": {
    "service": "gitlab",

    "secret": "supersecretsecret",
    "events": {
      "Merge Request Hook": "/home/stylebot/check_mr.sh"
    }
  }
}
```
