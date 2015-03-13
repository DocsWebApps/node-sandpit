var myModule=require('./exports_module.js');
var returnFooFunc=require('./exports_module.js').foo;
var returnFooExec=require('./exports_module.js').foo();
var makeReq=require('./exports_module.js').makeRequest;
var makeModRequest=require('./exports_module1.js');

try {
  console.log(myModule.foo()); // should print 'I am foo'
  console.log(myModule.bar()); // should print 'I am bar'
  console.log(myModule.baz()); // should produce an error message
} catch(e) {
  console.log(e);
}

console.log(returnFooFunc());
console.log(returnFooExec);

makeReq('Hello');
makeModRequest('Hi there');

// Module searching
// require('./module1'); - searches in the current directory
// require('../module1'); - searches in the directory above
// require('/usr/bin/module1'); - searches in the absolute directory /usr/bin/
// require('module1'); // searches for a node_modules directory in the current directory
// and if it doesnt find one then it searches through each parent directory until
// it finds a node_modules directory with the module1 in it.