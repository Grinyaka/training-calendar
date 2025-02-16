import { useEffect } from 'react'
import { PageContainer } from '../../components/PageContainer'
import { useStoreMain } from '../../store'
import DatePicker from './DatePicker'


const MainPage = () => {
  const {getMothData} = useStoreMain(state => state.actions)
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