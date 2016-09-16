# Political Bingo

Built because I wanted something to play with during the 2016 presidential debates.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisities

If you haven't yet, you'll need to [install node and npm](https://nodejs.org/en/download/). Then you'll need to install gulp. From terminal:

```sh
$ npm install --global gulp
```

### Installing

With npm and gulp installed, you're good to go. To compile the source files into `dist` run:

```sh
$ gulp
```

For development, you can compile the files and view the project in your browser as you make changes at http://localhost:3000/ by running:

```sh
$ gulp serve
```

This will serve the site using local files in the `app` directory, as well as a generated `.tmp` directory. To view the site using compiled files in the `dist` directory, you can do:

```sh
$ gulp serve:dist
```

## Built With

### Boilerplate
- [Web Sarter Kit](https://developers.google.com/web/tools/starter-kit/)

### SCSS Libraries
- [Bourbon](https://bourbon.io/) - Mixin library.
- [Neat](https://neat.bourbon.io/) - Simple, semantic grid framework.

### JS Libraries
- [jQuery](https://jquery.com/)
- [Underscore.js](http://underscorejs.org/)

### Dev dependencies
- [Pug](https://pugjs.org/) - Node templating library.
- [node-underscorify](https://www.npmjs.com/package/node-underscorify) - Underscore.js template precompiler.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Authors

* **Jon Jandoc** - developer

See also the list of [contributors](https://github.com/jjandoc/debate-bingo/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Chris Meyer, Bronwyn Beck, Andrew Rothman, and Sarah Hawley for their copy contributions and bingo square brainstorming.
