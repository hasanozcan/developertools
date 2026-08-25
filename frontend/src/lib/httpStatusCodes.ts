export interface HttpCodeDetail {
  code: number;
  phrase: string;
  category: '1xx Informational' | '2xx Success' | '3xx Redirection' | '4xx Client Error' | '5xx Server Error';
  description: string;
}

export const HTTP_STATUS_LIST: HttpCodeDetail[] = [
  { code: 200, phrase: 'OK', category: '2xx Success', description: 'Standard response for successful HTTP requests.' },
  { code: 201, phrase: 'Created', category: '2xx Success', description: 'Request fulfilled, resulting in the creation of a new resource.' },
  { code: 204, phrase: 'No Content', category: '2xx Success', description: 'Request processed successfully, but returning no content.' },
  { code: 301, phrase: 'Moved Permanently', category: '3xx Redirection', description: 'The requested resource has been definitively moved to the URL given by the Location headers.' },
  { code: 302, phrase: 'Found', category: '3xx Redirection', description: 'Resource temporarily resides under a different URI.' },
  { code: 304, phrase: 'Not Modified', category: '3xx Redirection', description: 'Indicates that the resource has not been modified since the version specified by the request headers.' },
  { code: 400, phrase: 'Bad Request', category: '4xx Client Error', description: 'The server cannot or will not process the request due to client error.' },
  { code: 401, phrase: 'Unauthorized', category: '4xx Client Error', description: 'Authentication is required and has failed or has not yet been provided.' },
  { code: 403, phrase: 'Forbidden', category: '4xx Client Error', description: 'The request contained valid data and was understood by the server, but the server is refusing action.' },
  { code: 404, phrase: 'Not Found', category: '4xx Client Error', description: 'The requested resource could not be found but may be available in the future.' },
  { code: 422, phrase: 'Unprocessable Entity', category: '4xx Client Error', description: 'Semantic errors in the request payload prevented processing.' },
  { code: 429, phrase: 'Too Many Requests', category: '4xx Client Error', description: 'The user has sent too many requests in a given amount of time (rate limiting).' },
  { code: 500, phrase: 'Internal Server Error', category: '5xx Server Error', description: 'A generic error message, given when an unexpected condition was encountered.' },
  { code: 502, phrase: 'Bad Gateway', category: '5xx Server Error', description: 'The server, while acting as a gateway or proxy, received an invalid response from the inbound server.' },
  { code: 503, phrase: 'Service Unavailable', category: '5xx Server Error', description: 'The server is currently unavailable (because it is overloaded or down for maintenance).' },
  { code: 504, phrase: 'Gateway Timeout', category: '5xx Server Error', description: 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.' },
];

export function lookupHttpStatusCode(query: string): HttpCodeDetail[] {
  const q = query.toLowerCase().trim();
  if (!q) return HTTP_STATUS_LIST;
  return HTTP_STATUS_LIST.filter(c => c.code.toString().includes(q) || c.phrase.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
}
