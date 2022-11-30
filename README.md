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
You can find the builded version into terminusdb-dashboard/packages/tdb-dashboard/dist

## Publishing

To release a new version, simply follow these steps:

1. Create a new branch for the release
2. Run `npm version NEW_VERSION_HERE --ws`, this will increment the version on all the packages inside
   their package.json and package-lock.json files.
3. Commit these new package.json files
4. Make a PR, make sure the tests pass and let someone else code-review and approve
5. Merge the PR to main and wait for the tests to pass
6. Tag the new release with `git tag vYOUR_VERSION_NUMBER` (for example: `git tag v5.0.0`)
7. The packages are now on npm
How to use the terminusdb dashboard source code with your local terminusdb instance.








