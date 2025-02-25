const connect = require('connect');
const url = require('url');

// Create a new Connect app
const app = connect();

// Create a calculate function
function calculate(req, res) {
  // Parse the URL to get query parameters
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  
  // Extract method, x, and y from query
  const method = query.method;
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);
  
  // Check if all parameters are provided
  if (!method || isNaN(x) || isNaN(y)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Missing or invalid parameters. Please provide method, x, and y.');
    return;
  }
  
  let result;
  let symbol;
  
  // Perform the appropriate operation based on the method
  switch (method) {
    case 'add':
      result = x + y;
      symbol = '+';
      break;
    case 'subtract':
      result = x - y;
      symbol = '-';
      break;
    case 'multiply':
      result = x * y;
      symbol = '*';
      break;
    case 'divide':
      if (y === 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Cannot divide by zero.');
        return;
      }
      result = x / y;
      symbol = '/';
      break;
    default:
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid method. Please use add, subtract, multiply, or divide.');
      return;
  }
  
  // Send the result back to the client
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`${x} ${symbol} ${y} = ${result}`);
}

// Set up the middleware
app.use(calculate);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});