import './App.css'
import WelcomePage from '../components/WelcomePage';
import LoginForm from '../components/LoginForm';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies] = useCookies(['tokens'])
  return (
      <>
        <div className='container'>
          {cookies.tokens ? (<WelcomePage/>) : <LoginForm/>}
        </div>
      </>
  )
}

export default App