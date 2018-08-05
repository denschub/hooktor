Hooktor
=======

Hooktor is a little Node.js application that listens for webhooks, and depending on some factors, runs anything you want as a reaction to it. You may call it a small web*hook* reac*tor*.

Design
------

Hooktor is designed to support multiple kinds of webhooks, and multiple targets. The URLs for incoming hooks are rather simple, for example:

```
https://hooktor.example.com/[project]/[endpoint]
```

Hook endpoints are combined into what Hooktor calls *projects*. Projects are a simple way to group multiple webhooks together into a logical unit, and into one config file as well. This makes it easy to keep somewhat maintainable configurations, even when maintaining a log of hooks for lots of applications. A project can have an unlimited amount of *endpoints*, which are the key that identifies what kind of hook data is expected, and what should happen with the incoming events.

Some kinds of events expose parts of the information (like, for example, the pull request ID for GitHub pull request webhooks) as environmental variables to be used by the script. For maximum flexibility, the entire hook payload is provided to the hook script via `STDIN`, so you are free to extract everything you need to!

For more details, information on how to get set up, and to explore some examples, have a look at [`docs/projects_and_endpoints.md`](/docs/projects_and_endpoints.md).

Setup and Usage
---------------

1. You need a recent version of Node.js installed. 10.x works great, 8.x LTS is supported as well.
2. Checkout the sources and store them somewhere you are comfortable with.
3. Run `npm i`.
4. Create [a configuration file](/docs/config.md) and store it somewhere, like `/etc/hooktor/config.json`
5. Run `node hooktor.js /etc/hooktor/config.json`

Further documentation
---------------------

* [The configuration file](/docs/config.md).
* [Documentation on Projects and Endpoints, as well as the supported services and their parameters](/docs/projects_and_endpoints.md).

Contribute
----------

Feel free to jump in! Regardless if you file an issue on GitHub or end up contributing source, I will be very happy about it! If you have, for any reason, a question you do not want to ask in public, feel free to [reach out to me directly](https://schub.io/contact) and we'll figure it out.

### Adding a service

Adding a service (i.e. a new type of webhook payload) can be done by adding a new file to `lib/services/` with a reasonably identifiable name. Each service must extend the `Service` base class in `lib/service.js` and implement the `isValid()` and `execute()` functions to be functional. If possible, I'd like to keep the number of dependencies as low as possible, but if there is a need for it, I will not complain. Also, for good measure, I require adding a documentation file to `/docs/services/` as well. :)

Production use
--------------

So... although I am using this thing on my production servers, take care when deploying this in a production environment. At this point in time, bugs may attack you everywhere, and it is more than possible that the application will behave in unexpected ways if there is something wrong with anything, as I didn't do much error handling. :)

License
-------

MIT.
