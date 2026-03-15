// noteNode.js — sticky note / annotation node (no handles)
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.note || 'Write a note...');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="Note"
      inputs={[]}
      outputs={[]}
      style={{
        '--node-border': 'rgba(234,179,8,0.4)',
        '--node-header-bg': 'rgba(234,179,8,0.12)',
        '--accent-light': '#fde047',
        minWidth: 180,
      }}
    >
      <div className="node-field">
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); updateNodeField(id, 'note', e.target.value); }}
          style={{ height: 80 }}
          placeholder="Write a note..."
        />
      </div>
    </BaseNode>
  );
};
