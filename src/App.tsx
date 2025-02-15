import {BrowserRouter, Route, Routes} from 'react-router'
import MainPage from './pages/main'
import ActivitiesPage from './pages/activities'
import DatePage from './pages/main/date'
import ProfilePage from './pages/profile'
import GoalsPage from './pages/goals'
import { ThemeProvider } from 'styled-components'
import { MainTheme } from './styled/Theme'
import Menu from './components/Menu'

function App() {
  return (
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:date" element={<DatePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/goals" element={<GoalsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
