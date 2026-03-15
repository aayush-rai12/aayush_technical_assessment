// outputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };
  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Output"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[]}
      style={{ '--node-border': 'rgba(16,185,129,0.4)', '--node-header-bg': 'rgba(16,185,129,0.12)', '--accent-light': '#6ee7b7' }}
    >
      <div className="node-field">
        <label>Name</label>
        <input type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="node-field">
        <label>Type</label>
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
