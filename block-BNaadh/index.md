writeCode

Q. write express generator command with varying options to generate express app with following features:

- using ejs as template engine
  ```
  express --view=ejs APP_NAME
  ```
- no views for express application
  ```
  express APP_NAME --no-view
  ```
- express app with gitignore
  ```
  express APP_NAME --git 
  ```
- express app with sass support for styling.
  ```
  express APP_NAME --css=sass
  ```
- ejs as template engine and sass for styling
  ```
  express APP_NAME --view=ejs --css=sass
  ```
- pug as template engine and gitignore together
  ```
  express APP_NAME --view=pug --git
  ```
