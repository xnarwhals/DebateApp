import './App.css'
import Layout from './components/Layout'
import Main from './components/Main'
import Archive from './components/Archive';

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </>
  )
}


export default App;