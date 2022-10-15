## Contributing

So you want to contribute to try-require? We already love you!

To make this as easy as possible for you, here's some simple guidelines:

### Reporting issues

- All **issues** are **welcome**.
  - These include bug reports, questions, feature requests and enhancement
    proposals
  - [GitHub's issue tracker](https://github.com/sverweij/try-require/issues)
    is the easiest way to submit them.
- We've made a [template](./ISSUE_TEMPLATE.md) to make it more easy for you to
  report an issue - it'll also help in getting a faster response (/ and possibly
  a fix as well).
- In turn, we try to **respond within a week**.  
  This might or might not include an actual code fix.

### Contributing code

- We prefer well documented
  **[pull requests](https://help.github.com/articles/creating-a-pull-request/)**
  based on the most recent version of the **develop** branch.
- Code quality
  - Additions pass eslint and depcruise (as configured for this repo)
  - Unit tests prove your code does what it intends (we use mocha).
  - Your code does not introduce regressions - `npm run check` proves
    this.
  - Code style (you know, petty things like indentations, where brackets go,
    how variables & parameters are named) fits in with the current code base.
    (tip: use `npm run lint:fix`)
- Plan to do something drastic?  
  Leave an [issue](https://github.com/sverweij/try-require/issues/new)
  on GitHub, so we can talk about it
- try-require is released with a [code of conduct](../CODE_OF_CONDUCT.md), adapted
  from the [contributor covenant](http://contributor-covenant.org/).

### Legal

- the code you add will be subject to
  [the MIT license](../LICENSE), just like the rest of try-require
- the code you add is your own original work
