import logo from './logo.svg'
import './App.css'
import Main from './Timemap/Main'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'

function App () {
  return (
    <div className='App'>
      <Main />
      <Calendar className='rounded centered shadow frame font' locale='fr' />
    </div>
  )
}

export default App
