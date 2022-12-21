import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Main from './Main';
import Search from './Search';
import Add from './Add';
import NoPageFound from './NoPageFound';

// It's ridiculous how much I love React
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<Main />}></Route>
          <Route path='search' element={<Search></Search>}></Route>
          <Route path='add' element={<Add></Add>}></Route>
          <Route path='*' element={<NoPageFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

