// llmNode.js
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      inputs={[
        { id: 'system', label: 'System Prompt' },
        { id: 'prompt', label: 'User Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <span className="node-info">Language Model</span>
    </BaseNode>
  );
};
