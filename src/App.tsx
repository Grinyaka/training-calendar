import {BrowserRouter, Route} from 'react-router'
import MainPage from './pages/main'
import ActivitiesPage from './pages/activities'
import DatePage from './pages/main/date'
import ProfilePage from './pages/profile'
import GoalsPage from './pages/goals'
import { ThemeProvider } from 'styled-components'
import { MainTheme } from './styled/Theme'

function App() {
  return (
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <Route path="/" element={<MainPage />}>
          <Route path="/:date" element={<DatePage />} />
        </Route>
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
