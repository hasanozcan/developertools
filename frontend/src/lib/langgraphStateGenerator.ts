export interface StateField {
  name: string;
  type: string;
  reducer?: 'add_messages' | 'replace';
}

export function generateLangGraphState(
  graphName: string,
  fields: StateField[],
  language: 'python' | 'typescript' = 'python'
): string {
  if (language === 'typescript') {
    const props = fields.map(f => `  ${f.name}: ${f.type === 'messages' ? 'BaseMessage[]' : f.type};`).join('\n');
    return `import { StateGraph, Annotation, messagesStateReducer } from '@langchain/langgraph';
import { BaseMessage } from '@langchain/core/messages';

export const ${graphName}Annotation = Annotation.Root({
${fields.map(f => f.type === 'messages' ? `  ${f.name}: Annotation<BaseMessage[]>({ reducer: messagesStateReducer, default: () => [] }),` : `  ${f.name}: Annotation<${f.type}>(),`).join('\n')}
});

export type ${graphName}State = typeof ${graphName}Annotation.State;

const workflow = new StateGraph(${graphName}Annotation)
  .addNode("agent", async (state) => {
    return {};
  })
  .addEdge("__start__", "agent")
  .addEdge("agent", "__end__");

export const app = workflow.compile();`;
  }

  const pyFields = fields.map(f => {
    if (f.type === 'messages' || f.name === 'messages') {
      return `    messages: Annotated[list[AnyMessage], add_messages]`;
    }
    return `    ${f.name}: ${f.type}`;
  }).join('\n');

  return `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_core.messages import AnyMessage

class ${graphName}State(TypedDict):
${pyFields}

def agent_node(state: ${graphName}State):
    return {}

builder = StateGraph(${graphName}State)
builder.add_node("agent", agent_node)
builder.add_edge(START, "agent")
builder.add_edge("agent", END)

graph = builder.compile()`;
}
