export interface McpValidationResult {
  isValid: boolean;
  type: 'request' | 'response' | 'notification' | 'unknown';
  method?: string;
  id?: string | number;
  errors: string[];
}

export function inspectMcpMessage(jsonString: string): McpValidationResult {
  const errors: string[] = [];
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { isValid: false, type: 'unknown', errors: ['Root JSON must be an object'] };
    }

    if (parsed.jsonrpc !== '2.0') {
      errors.push('Missing or invalid "jsonrpc": "2.0" field');
    }

    let type: 'request' | 'response' | 'notification' | 'unknown' = 'unknown';

    if ('method' in parsed) {
      if (typeof parsed.method !== 'string') {
        errors.push('"method" must be a string');
      }
      type = 'id' in parsed ? 'request' : 'notification';
    } else if ('result' in parsed || 'error' in parsed) {
      type = 'response';
      if (!('id' in parsed)) {
        errors.push('JSON-RPC responses must contain an "id" field');
      }
    } else {
      errors.push('Message does not match standard JSON-RPC 2.0 / MCP schema');
    }

    return {
      isValid: errors.length === 0,
      type,
      method: typeof parsed.method === 'string' ? parsed.method : undefined,
      id: parsed.id,
      errors,
    };
  } catch (e: any) {
    return { isValid: false, type: 'unknown', errors: ['Invalid JSON syntax: ' + e.message] };
  }
}