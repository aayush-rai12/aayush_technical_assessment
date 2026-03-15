// App.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './app.css';

function App() {
  return (
    <div className="app-layout">
      <PipelineToolbar />
      <div className="app-canvas-area">
        <PipelineUI />
        <div className="app-footer">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
