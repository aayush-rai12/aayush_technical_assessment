// timerNode.js — Delay / timer node
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="Timer"
      inputs={[]}
      outputs={[{ id: 'trigger', label: 'Trigger' }]}
      style={{
        '--node-border': 'rgba(249,115,22,0.4)',
        '--node-header-bg': 'rgba(249,115,22,0.12)',
        '--accent-light': '#fdba74',
      }}
    >
      <div className="node-field">
        <label>Delay (ms)</label>
        <input
          type="number"
          value={delay}
          min={0}
          step={100}
          onChange={(e) => { setDelay(e.target.value); updateNodeField(id, 'delay', e.target.value); }}
        />
      </div>
    </BaseNode>
  );
};
