// textNode.js  (Part 1 + Part 3)
// Part 1: uses BaseNode abstraction
// Part 3: auto-resizes with content; detects {{varName}} and creates dynamic handles

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const MIN_WIDTH = 210;
const MIN_HEIGHT = 60;
const CHAR_WIDTH = 7.5;   // approx px per character
const LINE_HEIGHT = 18;   // approx px per line

function extractVars(text) {
  const vars = [];
  const seen = new Set();
  let match;
  VAR_REGEX.lastIndex = 0;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [vars, setVars] = useState(() => extractVars(data?.text || '{{input}}'));
  const [nodeSize, setNodeSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });
  const updateNodeField = useStore((s) => s.updateNodeField);

  // Recalculate size and variables whenever text changes
  useEffect(() => {
    const lines = currText.split('\n');
    const longestLine = Math.max(...lines.map((l) => l.length));
    const newWidth = Math.max(MIN_WIDTH, longestLine * CHAR_WIDTH + 40);
    const newHeight = Math.max(MIN_HEIGHT, lines.length * LINE_HEIGHT + 16);
    setNodeSize({ width: newWidth, height: newHeight });
    setVars(extractVars(currText));
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const getTopPercent = (index, total) => {
    if (total === 1) return '50%';
    return `${((index + 1) / (total + 1)) * 100}%`;
  };

  return (
    <div style={{ position: 'relative' }}>
      <BaseNode
        id={id}
        label="Text"
        inputs={[]}   // dynamic handles added below
        outputs={[{ id: 'output', label: 'Output' }]}
        style={{
          width: nodeSize.width,
          '--node-border': 'rgba(245,158,11,0.4)',
          '--node-header-bg': 'rgba(245,158,11,0.12)',
          '--accent-light': '#fcd34d',
        }}
      >
        <div className="node-field">
          <label>Text</label>
          <textarea
            value={currText}
            onChange={handleTextChange}
            style={{ height: nodeSize.height, minHeight: MIN_HEIGHT }}
            spellCheck={false}
          />
        </div>

        {/* Dynamic variable handles */}
        {vars.map((varName, i) => (
          <Handle
            key={varName}
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{
              top: getTopPercent(i, vars.length),
              background: 'var(--handle-input-color, #06b6d4)',
              border: '2px solid var(--node-bg, #1e1e2e)',
              width: 11,
              height: 11,
              borderRadius: '50%',
              left: -6,
            }}
            title={varName}
          />
        ))}
      </BaseNode>

      {/* Variable labels floating left of handles */}
      {vars.map((varName, i) => (
        <div
          key={varName}
          style={{
            position: 'absolute',
            left: -80,
            top: `calc(${getTopPercent(i, vars.length)} + 24px)`, // offset for header
            fontSize: 9,
            fontFamily: 'Inter, sans-serif',
            color: '#06b6d4',
            background: 'rgba(6,182,212,0.12)',
            border: '1px solid rgba(6,182,212,0.3)',
            borderRadius: 4,
            padding: '1px 5px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {varName}
        </div>
      ))}
    </div>
  );
};
