import { useRoutes } from 'react-router-dom';
import './app.less';
import { routers } from './Routers'
function App() {
  return useRoutes(routers);
}
export default App;