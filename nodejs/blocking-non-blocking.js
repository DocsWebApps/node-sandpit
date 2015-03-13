// Blocking code
var fs=require('fs'),
	contents,
	callbackFunction;

contents=fs.readFileSync('/etc/hosts'); // Blocks until complete and then prints out 'Do something else...'
console.log(contents);
console.log('Do something else...');

// Non blocking code
callbackFunction=function(err, contents) {
	console.log(contents);
};

fs.readFile('/etc/hosts', callbackFunction);
console.log('Do something else...'); // Prints out while file is being read into memory