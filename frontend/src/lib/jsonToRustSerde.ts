export function convertJsonToRustSerde(jsonStr: string, rootStruct = 'Root'): string {
  const parsed = JSON.parse(jsonStr);
  const structs: string[] = [];

  function generateStruct(name: string, obj: Record<string, any>): string {
    const fields: string[] = [];
    for (const [key, val] of Object.entries(obj)) {
      const rustKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
      let typeStr = 'serde_json::Value';
      if (val === null) typeStr = 'Option<serde_json::Value>';
      else if (typeof val === 'string') typeStr = 'String';
      else if (typeof val === 'number') typeStr = Number.isInteger(val) ? 'i64' : 'f64';
      else if (typeof val === 'boolean') typeStr = 'bool';
      else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
          const subName = name + key.charAt(0).toUpperCase() + key.slice(1);
          generateStruct(subName, val[0]);
          typeStr = "Vec<" + subName + ">";
        } else if (val.length > 0) {
          const inner = typeof val[0] === 'string' ? 'String' : typeof val[0] === 'number' ? (Number.isInteger(val[0]) ? 'i64' : 'f64') : 'bool';
          typeStr = "Vec<" + inner + ">";
        } else {
          typeStr = 'Vec<serde_json::Value>';
        }
      } else if (typeof val === 'object') {
        const subName = name + key.charAt(0).toUpperCase() + key.slice(1);
        generateStruct(subName, val);
        typeStr = subName;
      }
      fields.push('    #[serde(rename = "' + key + '")]\n    pub ' + rustKey + ': ' + typeStr + ',');
    }
    const code = '#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]\n#[serde(rename_all = "camelCase")]\npub struct ' + name + ' {\n' + fields.join('\n') + '\n}';
    structs.push(code);
    return code;
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object') {
      generateStruct(rootStruct + 'Item', parsed[0]);
      return 'use serde::{Deserialize, Serialize};\n\npub type ' + rootStruct + ' = Vec<' + rootStruct + 'Item>;\n\n' + structs.join('\n\n');
    }
    return 'use serde::{Deserialize, Serialize};\n\npub type ' + rootStruct + ' = Vec<serde_json::Value>;';
  }
  generateStruct(rootStruct, parsed);
  return 'use serde::{Deserialize, Serialize};\n\n' + structs.join('\n\n');
}
