// filterNode.js — conditional branching node
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleChange = (e) => {
    setCondition(e.target.value);
    updateNodeField(id, 'condition', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Filter"
      inputs={[
        { id: 'input', label: 'Input' },
        { id: 'condition', label: 'Condition' },
      ]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' },
      ]}
    >
      <div className="node-field">
        <label>Condition Expression</label>
        <input
          type="text"
          value={condition}
          onChange={handleChange}
          placeholder="e.g. value > 10"
        />
      </div>
    </BaseNode>
  );
};
