import { useEffect } from 'react'
import { PageContainer } from '../../components/PageContainer'
import { useMainStore } from '../../store'
import DatePicker from './DatePicker'


const MainPage = () => {
  const {getMothData} = useMainStore(state => state.actions)
  useEffect(() => {
    getMothData()
  }, [])
  return (
    <PageContainer>
      <DatePicker />
    </PageContainer>
  )
}

export default MainPage