Configurating HackTor
=====================

TL;DR: Check out [`/docs/examples/config.json`](/docs/examples/config.json) for an example config file.

---

The main configuration happens via a JSON file somewhere, I suggest `/etc/hacktor/config.json` as a good starting point. The example file at [`/docs/examples/config.json`](/docs/examples/config.json) shows how it should look like.

Available parameters
--------------------

Everything is required.

* `enabledServices`, an array of enabled services. See [`/docs/projects_and_endpoints.md`](/docs/projects_and_endpoints.md) for a list of currently available services.
* `projectConfigRoot`, the directory the project config files are stored in. If you receive a hook on `/blog/sources`, Hooktor expects the project config file for that to be at `[projectConfigRoot]/blog.json`.
* `server`, the `address` and `port` the HackTor should listen on.

Deploying to the internet
-------------------------

HackTor does not support SSL directly, but I strongly recommend using SSL for webhook payload delivery. Therefore, having HackTor listen on a localhost port and using a reverse proxy like Nginx is recommended.

Project configuration files
---------------------------

Project configuration files, and how to add hooks, is described in [`/docs/projects_and_endpoints.md`](/docs/projects_and_endpoints.md).
