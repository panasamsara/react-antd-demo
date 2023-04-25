import { useRoutes } from 'react-router-dom';
import './index.css';
import { routers } from './Routers'
function App() {
  return useRoutes(routers);
}
export default App;