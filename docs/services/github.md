`github`
========

Setup
-----

See [GitHubs official documentation](https://developer.github.com/webhooks/creating/) for information on how to create a new webhook in your repo, user, or organisation. Make sure to select the `application/json` content type.

Config
------

* `service`, required, has to be `github`.
* `secret`, optional (but recommended), a shared secret between GitHub and the hook receiver.
* `events`, required, an object mapping each event to a thing to run. See [GitHubs documentation](https://developer.github.com/webhooks/#events) for a list of all avialable events.

`STDIN`
-------

The entire payload is passed to the runnable via `STDIN`.

Environment variables
---------------------

* Available for all events:
  * `EVENT`, the event triggered.
* Available for `pull_request` events:
  * `ACTION`, the [action](https://developer.github.com/v3/activity/events/types/#events-api-payload-28) executed on the PR.
  * `BASE`, the base the PR was opened against.
  * `PR`, the PR number.
* Available for `push` events:
  * `REF`, the rev that received a push.

Example
-------

```json
{
  "example": {
    "service": "github",

    "secret": "supersecretsecret",
    "events": {
      "pull_request": "/home/stylebot/check_pr.sh"
    }
  }
}
```
