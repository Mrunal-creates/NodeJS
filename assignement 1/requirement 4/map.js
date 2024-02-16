import { readFile } from 'fs'; // importing named function readFile
import { getDirName } from './util.js'; // importing named function getDirName

// Invoking 'getDirName' function and storing the result in the constant '__dirname'
const __dirname = getDirName();

// Defining an async function 'readFilePromise' that takes a filename as an argument
const readFilePromise = (filename) => {
  // Returning a new Promise that takes two arguments: 'resolve' and 'reject'
  return new Promise((resolve, reject) => {
    // Invoking 'readFile' function with the provided filename, encoding, and a callback function
    readFile(filename, 'utf8', (err, data) => {
      // If there is an error, reject the Promise with the error as an argument
      if (err) {
          reject(err);
          return;
      }      
      // If there is no error, resolve the Promise with the data as an argument
      resolve(data);
    });
  });
};

// Sprint: Attaching 'exit' and 'unhandledRejection' events to the 'process' object

// Attach 'exit' event
process.on('exit', (code) => {
    console.log(`'exit' event called. Process exited with code ${code}`);
});

// Attach 'unhandledRejection' event
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
    console.log("'unhandledRejection' event called. Reason:", reason);
    // Exit the process with a non-zero exit code
    process.exit(1);
});



readFilePromise(`${__dirname}/data1.txt`) // Using incorrect filename to trigger error
  .then((data) => {
    console.log('File content:\n');
    console.log(data);
    throw new Error('my error');
    return 'Success';
  })
  .then((customData) => {
    console.log('customData:', customData);
  })
  .catch((error) => {
    console.error('Error reading the file:', error);
    // Throwing a new error to trigger an unhandled rejection event
    throw new Error('Error occurred while processing file');
    // Exiting the process with a non-zero exit code
    process.exit(1);
});
