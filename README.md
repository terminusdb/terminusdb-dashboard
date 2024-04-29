# terminusdb-dashboard

Dashboard for TerminusDB. Monorepo for the TerminusDB dashboard components. Please see the individual packages for more
details. The main dashboard package can be found in `packages/tdb-dashboard`.

## Setting up terminusdb-dashboard

**Clone the repository**

```sh
git clone https://github.com/terminusdb/terminusdb-dashboard.git
```

**Install all the dependencies**

```sh
cd terminusdb-dashboard
npm install
```

**Build the dashboard**

Rename ENV.local to .env
```sh
cd terminusdb-dashboard/packages/tdb-dashboard
cp ENV.local .env

npm run build
```
You can find the built version into terminusdb-dashboard/packages/tdb-dashboard/dist

**Locally Developing the dashboard**

Running `npm run start` instead of `build` starts a server and watches for changes. Because of the way this is configured, you will need to go to `/dashboard` after connecting in browser

```sh
npm run start
```

There are some differences depending on how you are developing it, if you are just running the dashboard repo locally:

- Comment out the `@terminusdb/terminusdb-client` alias in the webpack config
- Update the env file to have the `BASE_URL` be empty (also generally useful since this is where the webpack server opens the new browser window), this will mean you don't have to go to `/dashboard` as above

There is some additional configuration needed if you are wanting to run with Auth0 Login, essentially you just need a proxy and to setup the right auth0 config. This will allow you to login but the token generated will not be valid so you will need to replace it manually with a valid one.

## Publishing

To release a new version, simply follow these steps:

1. Create a new branch for the release
2. Run `npm version NEW_VERSION_HERE --ws`, this will increment the version on all the packages inside
   their package.json and package-lock.json files.
3. Commit these new package.json files
4. Make a PR, make sure the tests pass and let someone else code-review and approve
5. Merge the PR to main and wait for the tests to pass
6. Tag the new release with `git tag vYOUR_VERSION_NUMBER` (for example: `git tag v5.0.0`) in you local machine
   and push the tag in git `git push origin vYOUR_VERSION_NUMBER`
7. The packages are now on npm
How to use the terminusdb dashboard source code with your local terminusdb instance.








