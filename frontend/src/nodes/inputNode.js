// inputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };
  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Input"
      inputs={[]}
      outputs={[{ id: 'value', label: 'Value' }]}
      style={{ '--node-border': 'rgba(6,182,212,0.4)', '--node-header-bg': 'rgba(6,182,212,0.12)', '--accent-light': '#67e8f9' }}
    >
      <div className="node-field">
        <label>Name</label>
        <input type="text" value={currName} onChange={handleNameChange} />
      </div>
      <div className="node-field">
        <label>Type</label>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
