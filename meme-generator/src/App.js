import React, { useState } from 'react';
import './index.css';
import Gallery from './components/Gallery';
import MemeEditor from './components/MemeEditor';

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PV Meme Generator</h1>
      </header>

      {!selected && <p>Select a meme template below.</p>}
      {selected && <MemeEditor imageSrc={selected} />}

      <Gallery onSelect={setSelected} />
    </div>
  );
}

export default App;
