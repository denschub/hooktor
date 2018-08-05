Projects and Endpoints
======================

TL;DR: Check out [`/docs/examples/project.json`](/docs/examples/project.json) for an example project config file. Rename it to what you want your project to be called, and place it inside the `projectConfigRoot`.

---

As mentioned in the [`README.md`](/README.md), HackTor is designed to make handling multiple projects somewhat easy. Therefore, incoming webhooks are delivered to a customizable URL in the form of

```
https://hooktor.example.com/[project]/[endpoint]
```

Projects
--------

Projects are a set of endpoints. Each project has its own configuration file to keep them somewhat managable, an example config file is available at [`/docs/examples/project.json`](/docs/examples/project.json).

Project configuration files have to be placed in the directory specified in [the application config](/docs/config.md). If the project segment of the URL is `exampleapp`, Hooktor expects a `exampleapp.json` in that directory. Project names are evaluated against `[\w-]+`, which means they can consist of letters, numbers, underscores, and hyphens.

Endpoints
---------

Endpoints are the second part of the URL, and the first level of keys in the project configuration files. Endpoint names are evaluated against `[\w-]+`, which means they can consist of letters, numbers, underscores, and hyphens.

Each endpoint has one generic parameter, `service`. This parameter defines what service shuold be used to handle the webhook payload. All other parameters are defined by the individual services. A list of avilable services and links to the endpoint parameters is available below.

Available Services
------------------

* [`github`](/docs/services/github.md)
* [`travis`](/docs/services/travis.md)

Example
-------

This config places in `example.json`

```json
{
  "codestyle": {
    "service": "github",

    "secret": "supersecretsecret",
    "events": {
      "pull_request": "/home/stylebot/check_pr.sh"
    }
  }
}
```

would listen for webhook notifications from GitHub on `https://hooktor.example.com/example/codestyle`, and run `/home/stylebot/check_pr.sh` for `pull_request` events.
