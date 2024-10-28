/**
 * Exercise 7 code
 *
 * Define the following endpoints:
 * 1. Endpoint 1  (GET): /jokebook/categories
 *   - should respond with a plain text response
 *   - should prepend the phrase "a possible category is " to each possible category and each
 *     sentence should be on its own line.
 * 2. Endpoint 2 (GET): /jokebook/joke/:category
 *   - should respond with a JSON response
 *   - will send a random JSON response from the specified /:category
 *   - If the category is not valid, will respond with {'error': 'no category listed for category'}
 */
'use strict';

const express = require('express');
const app = express();

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Why did the student eat his homework?',
    'response': 'Because the teacher told him it was a piece of cake!'
  },
  {
    'joke': 'What kind of tree fits in your hand?',
    'response': 'A palm tree'
  },
  {
    'joke': 'What is worse than raining cats and dogs?',
    'response': 'Hailing taxis'
  }
];
let lameJoke = [
  {
    'joke': 'Which bear is the most condescending?',
    'response': 'Pan-DUH'
  },
  {
    'joke': 'What would the Terminator be called in his retirement?',
    'response': 'The Exterminator'
  }
];

// Respond with a possible category in a plaintext format.
app.get('/jokebook/categories', async (request, response) => {

    // Select a random category from the category array.
    const possibleCategory = categories[Math.floor(Math.random() * categories.length)];

    // Create the possible category message.
    const categoryMessage = `a possible category is ${possibleCategory}\n`;

    // Respond with the message in plaintext.
    response.type('plain/text').send(categoryMessage);
})

// Respond with a random joke from the specified category in the JSON format.
app.get('/jokebook/categories/:category', (request, response) => {

    let possibleJokes = []

    // Format the request to parse it.
    const jokeCategory = String(request.params.category.trim().toLowerCase());

    // Find the joke category or return an error if it cannot be found.
    switch (jokeCategory) {

        case 'funnyjoke':
            possibleJokes = funnyJoke;
            break;

        case 'lamejoke':
            possibleJokes = lameJoke;
            break;

        default:
            return response.status(400).json({error: `no category listed for ${jokeCategory}`});
    }
    // Respond with a random joke from the given joke array.
    response.json(possibleJokes[Math.floor(Math.random() * possibleJokes.length)]);
})

app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.listen(PORT);