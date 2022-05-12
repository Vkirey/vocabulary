# Vocabulary application (EN-GR)

This application called 'Vocabulary Test'. Task was described like:

Write an Application that lets the user manage vocabulary for a foreign language to be learned. It consists of a Form where the user can insert two words, one for the native language (let's say English) and one for the foreign language (let's say German). The vocabulary pairs are appended to a List and can be deleted.

At any time the user can start a Test mode (add a button next to the list for it) which randomly chooses 20 words from the List in a random order. The Test mode then only shows one word at a time together with an input field where the user needs to insert the translated word. Submitting the translated word then shows the next word. The progress in the Test is indicated through a progress bar on top of the Test view. If no word is left, the Application will go to the Result view.

When the Test is finished, the Application calculates the results (hit ratio) and renders a Result view that shows the percentage of hits and a table showing all tested words together with the translation and the user input. Every row should have a visual indication if the word was a hit or a miss. With a Back button the user can return to the List.

## Run project

For yarn just run:

```
yarn && yarn start
```

or if you are stubborn enough:

```
npm i && npm run start
```