# terminusdb-dashboard
Dashboard for TerminusDB
How to use the terminusdb dashboard source code with your local terminusdb instance.

**Clone the repository**
```sh
git clone https://github.com/terminusdb/terminusdb-dashboard.git
```

**Install all the dependency** 
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










