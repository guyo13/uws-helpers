'use strict';

// Copyright (c) 2021, Guy Or Please see the AUTHORS file for details.
//  All rights reserved. Use of this source code is governed by a MIT
//  license that can be found in the LICENSE file.

// WebSockets:

/// Ends a uWebSockets WebSocket object [ws] with optional [code] and [message]
function endWebSocketConnection(ws, code, message) {
  try {
    console.log('Terminating socket');
    ws.end(code, message);
  } catch(err) {
    console.error('Error ending web socket connection');
    console.error(err);
  }
}

// Responses:

/// Responds to a web server request.
/// [res] - uWebSockets HTTPResponse
/// [code] - HTTP status code (String)
/// [body] - Response body (String)
/// [headers] - Optional, Map object with keys set to required headers and values are their content
function sendResponse(res, code, body, headers=undefined) {
  res.cork(() => {
    if (!res.aborted) {
      res.writeStatus(code);
      if (!!headers) {
        for (const [k, v] of headers) {
          res.writeHeader(k, v);
        }
      }
      res.end(body);
    }
  });
}

/// Responds to a web server request with JSON content.
/// [res] - uWebSockets HTTPResponse
/// [code] - HTTP status code (String)
/// [json] - Stringified JSON
/// [extraHeaders] - Optional, Map object with keys set to required headers and values are their content
function jsonResponse(res, code, json, extraHeaders=undefined) {
  const headers = extraHeaders != undefined ? new Map(extraHeaders) : new Map();
  headers.set('Content-Type', 'application/json');
  return sendResponse(res, code, json, headers);
}

// Headers:

/// Reads all headers from uWebSockets request object.
/// Returns an Object with headers as keys and their values as values
function readHeaders(req) {
  const headers = {};

  req.forEach((k, v) => {
    headers[k] = v;
  });

  return headers;
}

/// Gets the authorization from the request header.
/// Returns an array whose first element is the authroization type capitalized,
/// and it's second element is the credentials.
function getHeaderAuth(req) {
  const auth = req.getHeader('authorization').split(/ /);
  auth[0] = auth[0].toUpperCase();
  return auth;
}

/// Exports - Headers
module.exports.readHeaders = readHeaders;
module.exports.getHeaderAuth = getHeaderAuth;
/// Exports - Responses
module.exports.sendResponse = sendResponse;
module.exports.jsonResponse = jsonResponse;
/// Exports - WebSockets
module.exports.endWebSocketConnection = endWebSocketConnection;
