import {useParams} from 'react-router'
import styled from 'styled-components'
import {PageContainer} from '../../../components/PageContainer'
import Notes from './Notes'
import {useEffect, useState} from 'react'
import {useStoreMain} from '../../../store'
import ActivitiesList from './ActivitiesList'
import TimePicker from './TimePicker'

const Wrapper = styled(PageContainer)`
  align-items: start;
  max-width: 900px;

  padding: 15px;
  gap: 15px;
`
const Title = styled.span`
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  color: ${({theme}) => theme.textColors.secondary};
  font-weight: bold;
  padding: 5px 10px;
`

const DataRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: ${({theme}) => theme.fontSizes.medium};

  color: ${({theme}) => theme.textColors.secondary};
  font-weight: bold;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;

  width: 100%;

  word-break: keep-all;
  gap: 5px;
  > span {
    color: ${({theme}) => theme.textColors.primary};
    flex-grow: 1;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`

const DatePage = () => {
  const {date} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const {setDayData} = useStoreMain((state) => state.actions)
  const {dayData} = useStoreMain((state) => state)

  useEffect(() => {
    setDayData(Number(date) - 1)
    setIsLoading(false)
  }, [])
  return (
    <Wrapper>
      <Title>{date}</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <DataRow>
          <TimePicker from={dayData.from} to={dayData.to} />
          </DataRow>
          <ActivitiesList day={dayData.day - 1} currentActivities={dayData.activities} />
          <Notes day={dayData.day - 1} currentNotes={dayData.notes} />
        </>
      )}
    </Wrapper>
  )
}

export default DatePage
