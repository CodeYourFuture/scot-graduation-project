
#### Architecture 
- The communication between server and client works when developing because of adding a proxy value on `package.json` client-side, which allows the calls to API to be made without specifying the server hostname. I.e. If our React dev server runs on port 4000, and our Express app on port 3000, instead of making calls to `http://localhost:3000/api/users` from the React codebase, we can just call `/api/users`
- On Heroku, there is a line on the server `app.js` that makes it possible to use `express` to serve the React app serving it from the `build` folder (heroku runs `npm run build` first). So because Express statically serves our built React app when deployed to Heroku, we don't need a proxy as they will both be on the same host
- The app is published by Heroku CI workflow on: [https://cyf-grad-project-template.herokuapp.com](https://cyf-grad-project-template.herokuapp.com)
- The PRs should also be published automatically with a unique database for each

#### How Heroku builds the app:

Make sure you don't change the commands in the root `package.json` - they contain some defaults that Heroku knows how to run

Heroku follows the `master` branch of the GitHub repo and deploys on each commit to `http://cyf-grad-project-template.herokuapp.com`.
It also follows PRs made to that repo, and deploys a temporary build to `http://cyf-grad-project-template.herokuapp.com`.

**Every time it deploys Heroku will:**
- run the root `npm install` command
- run the `heroku-postbuild` command which will build the React client app, and put it in the build folder (from which it will get server by Express)
- run the `npm run recreate-db` command from the server folder (see Procfile) which will recreate the schema and populate with data

#### Steps to follow after "Using this template":

Once you "Use this template" and create an actual GitHub repository:

**Heroku:**
1. Create a new app on Heroku and connect it to this repository
2. Enable the "Postgres" build-pack
3. Enable automatic deploys from the master branch
4. Create review apps

**GitHub "Settings" pane:**
1. Make sure nobody can push/merge to master directly
2. Ensure PRs need at least 1 approver before they can be merged
3. Add the `@codeyourfuture` "mentors" and "scot-mentors" groups as admins to the projects
4. Add students as "write" contributors to the project
5. Optional - PRs need checks to pass before they can be merged in (will work once we enable GitHub Actions) 

#### TODO for next year:
- github action check that lints both projects and tries to build/run them
