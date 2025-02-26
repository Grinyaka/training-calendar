import { useEffect } from 'react'
import { PageContainer } from '../../components/PageContainer'
import DatePicker from './DatePicker'
import { useStoreActionsMonth, useStoreMonth } from '../../store/calendarStore'


const MainPage = () => {
  const currentMonth = useStoreMonth((state) => state.currentMonth)
  
  const {fetchMonthData} = useStoreActionsMonth()
  useEffect(() => {
    fetchMonthData()
  }, [currentMonth])
  
  return (
    <PageContainer>
      <DatePicker />
    </PageContainer>
  )
}

export default MainPage