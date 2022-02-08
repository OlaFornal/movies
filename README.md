## About

[Next.js](https://nextjs.org/) movie browser app using [TheMovieDB API](https://developers.themoviedb.org/3/getting-started/introduction) as a data source.

Check [live demo](https://movies-lovat-beta.vercel.app/) on Vercel Platform.

### Tech Stack

* [Next.js](https://nextjs.org/) - I used [Gatsby](https://www.gatsbyjs.com/) before, and Next is just better and more flexible,
* [Next-UI](https://nextui.org/) - UI library - still in beta, but I decided to give it a try to bootstrap this project and learn something new,
* [TypeScript](https://www.typescriptlang.org/) - my first TS app, previously used [PropTypes](https://www.npmjs.com/package/prop-types) to make coding  a bit easier, but TS is just the next step, and I love it,
* [Axios](https://axios-http.com/) - seems popular, so why not?

### Running on local

* Clone this repo,
* Install dependencies `yarn install`,
* [Request API key on TMDB](https://www.themoviedb.org/settings/api) - sign up first on TMDB platform, then fill the form to get one,
* Copy `.env` to `.env.local` [`cp .env .env.local`] and put received key in `MOVIE_DB_API_KEY` value,
* Run the app with `yarn dev`,
* Open browser [http://localhost:3000](http://localhost:3000) (port might differ if you have 3000 already taken - check console output)
