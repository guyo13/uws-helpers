# uws-helpers

uws-helpers is a library with helper functions for uWebSockets.js.

## Typical usage

```js
const { App } = require('uWebSockets.js');

const { getHeaderAuth, jsonResponse } = require('uws-helpers');

const app = App();

const accounts = new Set(['test1', 'test2']);

app.post('/my/api/endpoint', (res, req) => {
    const auth = getHeaderAuth(req);
    if (accounts.has(auth[1])) {
      return jsonResponse(res, '200', JSON.stringify( { msg: 'Welcome' } ));
    } else {
      return jsonResponse(res, '500', JSON.stringify( { error: 'Not authorized' } ));
    }
  );
});
```
