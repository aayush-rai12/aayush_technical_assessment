// apiNode.js — HTTP API call node
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://');
  const [method, setMethod] = useState(data?.method || 'GET');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="API Call"
      inputs={[{ id: 'body', label: 'Request Body' }]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <div className="node-field">
        <label>Method</label>
        <select
          value={method}
          onChange={(e) => { setMethod(e.target.value); updateNodeField(id, 'method', e.target.value); }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
      <div className="node-field">
        <label>URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); updateNodeField(id, 'url', e.target.value); }}
          placeholder="https://api.example.com/..."
        />
      </div>
    </BaseNode>
  );
};
