const http = require('http'),//creates variable called http and assigns to it an instancce of the HTTP module.
      url = require('url');
      fs = require('fs');

http.createServer((request, response) => { //takes he function 'createServer' from the module and passes two arguments into it
  var addr = request.url,
    q = url.parse(addr, true),
    filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  };

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080); //listens for a response on port 8080 (any port possible but, no lower than 1024)
