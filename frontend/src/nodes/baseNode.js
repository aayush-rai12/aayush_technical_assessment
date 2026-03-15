// baseNode.js
// Shared abstraction for all node types.
// Usage:
//   <BaseNode id={id} label="My Node" inputs={[...]} outputs={[...]}>
//     <div>...custom body...</div>
//   </BaseNode>
//
// inputs / outputs are arrays of objects:
//   { id: string, label?: string, style?: object }
// Handles are placed evenly along the left (inputs) or right (outputs) edge.

import { Handle, Position } from 'reactflow';
import '../nodes.css';

export const BaseNode = ({ id, label, inputs = [], outputs = [], children, style = {} }) => {
  const getTopPercent = (index, total) => {
    if (total === 1) return '50%';
    return `${((index + 1) / (total + 1)) * 100}%`;
  };

  return (
    <div className="base-node" style={style}>
      <div className="base-node__header">
        <span className="base-node__label">{label}</span>
      </div>
      <div className="base-node__body">
        {children}
      </div>

      {/* Input handles (left side) */}
      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{ top: getTopPercent(i, inputs.length), ...handle.style }}
          className="base-node__handle base-node__handle--input"
          title={handle.label}
        />
      ))}

      {/* Output handles (right side) */}
      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{ top: getTopPercent(i, outputs.length), ...handle.style }}
          className="base-node__handle base-node__handle--output"
          title={handle.label}
        />
      ))}
    </div>
  );
};
