
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages</code> and save to reload.
        </p>
        <Link to="/root"> to root</Link>
      </header>
    </div>
  );
}