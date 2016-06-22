# How to contribute


## 1. Fork me

Create a fork of this repository to start working on your feature.

As soon as you have pulled your fork to your workstation, you will have to use the following command to install all the dependencies:

```
$ npm install
```


## 2. Development Enviroment

In order to compile the typescript files each time you make an edit, use the following command: 

```
$ npm run dev
```

Before you commit, you should always run unit and lint tests on your code, to do this run:

```
$ npm run test
```

And do **not** commit your code if a test fails. 


## 3. Unit tests

When implementing a feature, please write unit tests for it. Do this in the `/test` directory.

Tape is to be used as testing framework [see documentation](https://github.com/substack/tape).
