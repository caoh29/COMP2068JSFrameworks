const prompt = require('prompt');


const START_MSG = 'Enter your choice (ROCK, PAPER, or SCISSORS): ';

const ERROR_MSG = 'Please enter ROCK, PAPER, or SCISSORS';

const REGEX_PATTERN = /^(ROCK|PAPER|SCISSORS)$/i;

const CHOICES = [
  {
    name: 'ROCK',
    beats: 'SCISSORS',
    range: {
      min: 0,
      max: 0.34
    }
  },
  {
    name: 'PAPER',
    beats: 'ROCK',
    range: {
      min: 0.35,
      max: 0.67
    }
  },
  {
    name: 'SCISSORS',
    beats: 'PAPER',
    range: {
      min: 0.68,
      max: 1
    }
  }
];



const getComputerChoice = () => {
  // Generates random number between 0 and 1
  const randomIndex = Math.random();
  
  // Returns the choice based on the random index
  for (const choice of CHOICES) {
    if (randomIndex >= choice.range.min && randomIndex <= choice.range.max) {
      return choice.name;
    }
  }
};

const getWinner = (userChoice, computerChoice) => {
  // Checks if the user's choice is the sames as the computer's choice
  if (userChoice === computerChoice) {
    return 'TIE';
  }
  
  // Check if userChoice beats computerChoice
  for (const choice of CHOICES) {
    if (choice.name === userChoice && choice.beats === computerChoice) {
      return 'User';
    }
  }

  // If userChoice does not beat computerChoice, computerChoice beats userChoice
  return 'Computer';
};

const callback = (err, result) => {
  // If there is an error, log it and keep going
  if (err) {
    console.error(err);
    return;
  }

  const userSelection = result.choice.toUpperCase();
  const computerChoice = getComputerChoice();
  const winner = getWinner(userSelection, computerChoice);

  console.log(`User selected: ${userSelection}`);
  console.log(`Computer selected: ${computerChoice}`);
  console.log(winner === 'TIE' ? 'It\'s a tie' : `${winner} Wins`);
};

function main() {
  // Start the game
  prompt.start()
  // Get user's choice
  prompt.get([{
    name: 'choice',
    description: START_MSG,
    required: true,
    pattern: REGEX_PATTERN,
    message: ERROR_MSG 
  }], callback);
}

main();