import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CreatePost from './Pages/CreatePost'
import Feed from './Pages/Feed'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/feed' element={<Feed/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
