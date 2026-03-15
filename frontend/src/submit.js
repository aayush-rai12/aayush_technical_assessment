// submit.js — Part 4: sends pipeline to backend and shows alert
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Play } from 'lucide-react';
import './submit.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://aayush-vectorshift-backend.onrender.com/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const { num_nodes, num_edges, is_dag } = data;

      alert(
        `Pipeline Analysis\n\n` +
        `Nodes:  ${num_nodes}\n` +
        `Edges:  ${num_edges}\n` +
        `Is DAG: ${is_dag ? 'Yes' : 'No (contains a cycle)'}`
      );
    } catch (err) {
      alert(`Failed to reach backend.\n\n${err.message}\n\nMake sure the backend is running:\nuvicorn main:app --reload`);
    }
  };

  return (
    <div className="submit-wrapper">
      <button className="submit-btn" onClick={handleSubmit}>
        <Play size={16} className="submit-btn__icon" />
        Run Pipeline
      </button>
    </div>
  );
};
