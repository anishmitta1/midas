Playground for ideas

For future reference: tutorial on how to use multiple git accounts:
https://www.youtube.com/watch?v=lLgWWtOk7gk&t=286s

Steps to create a CLI:

1. Create a bin directory in your project root and create a new file inside it called cli.js. This file should contain the code that runs your CLI application and update the package.json file to include the following line

```
"bin": { "my-cli": "./bin/cli.js" },
```

2. Add an "exports" field to your package.json file, which will tell Node.js how to import your module

```
"exports": {
  ".": "./bin/cli.js"
}
```

3. Run `npm link` to create a symlink from your CLI application to your global
