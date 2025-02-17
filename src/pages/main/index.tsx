import { useEffect } from 'react'
import { PageContainer } from '../../components/PageContainer'
import { useStoreMain } from '../../store'
import DatePicker from './DatePicker'


const MainPage = () => {
  const {getMonthData} = useStoreMain((state) => state.actions)
  useEffect(() => {
    getMonthData()
  }, [])
  
  return (
    <PageContainer>
      <DatePicker />
    </PageContainer>
  )
}

export default MainPage