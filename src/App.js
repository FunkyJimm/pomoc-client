import { Link } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>Pomoc dla bezdomnego</h1>
      <h2>Wersja: alpha 0.1</h2>

      <Link to="/shelters">Schroniska</Link>
    </div>
  );
}

export default App;
