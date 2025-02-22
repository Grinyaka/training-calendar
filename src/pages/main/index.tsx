import { useEffect } from 'react'
import { PageContainer } from '../../components/PageContainer'
import { useStoreMain } from '../../store'
import DatePicker from './DatePicker'


const MainPage = () => {
  const currentMonth = useStoreMain((state) => state.currentMonth)
  
  const {getMonthData} = useStoreMain((state) => state.actions)
  useEffect(() => {
    getMonthData()
  }, [currentMonth])
  
  return (
    <PageContainer>
      <DatePicker />
    </PageContainer>
  )
}

export default MainPage