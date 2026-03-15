// toolbar.js
import { DraggableNode } from './draggableNode';
import { 
  LogIn, 
  LogOut, 
  Bot, 
  FileText, 
  Calculator, 
  GitFork, 
  Globe, 
  Timer, 
  StickyNote,
  Zap
} from 'lucide-react';
import './toolbar.css';

const NODE_GROUPS = [
  {
    group: 'I/O',
    nodes: [
      { type: 'customInput', label: 'Input',  icon: <LogIn size={16} /> },
      { type: 'customOutput', label: 'Output', icon: <LogOut size={16} /> },
    ],
  },
  {
    group: 'AI',
    nodes: [
      { type: 'llm',  label: 'LLM',  icon: <Bot size={16} /> },
    ],
  },
  {
    group: 'Data',
    nodes: [
      { type: 'text',   label: 'Text',   icon: <FileText size={16} /> },
      { type: 'math',   label: 'Math',   icon: <Calculator size={16} /> },
      { type: 'filter', label: 'Filter', icon: <GitFork size={16} /> },
    ],
  },
  {
    group: 'Utilities',
    nodes: [
      { type: 'api',   label: 'API Call', icon: <Globe size={16} /> },
      { type: 'timer', label: 'Timer',    icon: <Timer size={16} /> },
      { type: 'note',  label: 'Note',     icon: <StickyNote size={16} /> },
    ],
  },
];

export const PipelineToolbar = () => (
  <div className="toolbar">
    <div className="toolbar__brand">
      <span className="toolbar__logo" style={{display: 'flex', color: '#a78bfa'}}><Zap size={22} fill="currentColor" /></span>
      <span className="toolbar__title">VectorShift-Aayush</span>
    </div>

    <div className="toolbar__groups">
      {NODE_GROUPS.map(({ group, nodes }) => (
        <div key={group} className="toolbar__group">
          <span className="toolbar__group-label">{group}</span>
          <div className="toolbar__nodes">
            {nodes.map(({ type, label, icon }) => (
              <DraggableNode key={type} type={type} label={label} icon={icon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
