// mathNode.js — Math expression node
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const [expr, setExpr] = useState(data?.expression || 'a + b');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="Math"
      inputs={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
    >
      <div className="node-field">
        <label>Expression</label>
        <input
          type="text"
          value={expr}
          onChange={(e) => { setExpr(e.target.value); updateNodeField(id, 'expression', e.target.value); }}
          placeholder="a + b"
        />
      </div>
    </BaseNode>
  );
};
