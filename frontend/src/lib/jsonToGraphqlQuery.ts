export function convertJsonToGraphqlQuery(jsonString: string, operationName: string = 'GetData'): string {
  try {
    const parsed = JSON.parse(jsonString);
    function extractFields(obj: any, indent: string = '  '): string {
      if (typeof obj !== 'object' || obj === null) return '';
      let fields = '';
      for (const [key, val] of Object.entries(obj)) {
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          fields += `${indent}${key} {\n${extractFields(val, indent + '  ')}${indent}}\n`;
        } else {
          fields += `${indent}${key}\n`;
        }
      }
      return fields;
    }

    return `query ${operationName} {\n${extractFields(parsed)}}\n`;
  } catch (e: any) {
    return '# Error: ' + e.message;
  }
}