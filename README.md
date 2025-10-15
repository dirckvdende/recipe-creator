
# Recipe

A web-app built with Nuxt + Vue.js to create nice-looking cooking recipe PDFs. The application is deployed [here](https://dirck.dev/recipe-creator).

## Running locally

The app can be built and run locally by downloading the source code and running the following command to install dependencies (after installing npm):
```sh
npm install
```
Then run the development server using
```sh
npm run dev
```
Navigate to [http://localhost:3000/](http://localhost:3000/) to view the development server.

## Recipe file format

For the import/export feature a custom file format is used. Documentation on this format can be found in [docs/file_format](./docs/file_format/).