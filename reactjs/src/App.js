import React, {useEffect, useState} from 'react'
import './App.css';

function App() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/' 
  : process.env.REACT_APP_BASE_URL;

  let ignore = false
  useEffect(()=>{
    
    if(!ignore){
      getAllUsers()
    }
    return ()=> {
      ignore = true
    }
  }, [])

  const getAllUsers = async () =>{
    setLoading(true)
    try {
      await fetch(`${API_BASE}user`)
            .then(res => res.json())
            .then(data => {setUser(data)})
    } catch (error) {
      setError(error.message || "Encountered an unexpected error")
    }finally{
      setLoading(false)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Greatings Users</h1>
      </header>
    </div>
  );
}

export default App;
