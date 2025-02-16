import {useParams} from 'react-router'
import styled from 'styled-components'
import {PageContainer} from '../../../components/PageContainer'
import {DateData} from '../../../models/DateData'
import Notes from './Notes'
import {useEffect, useState} from 'react'
import {useMainStore} from '../../../store'

type Props = {
  dayData: DateData
}

const Wrapper = styled(PageContainer)`
  align-items: start;
  max-width: 900px;

  padding: 15px;
  gap: 15px;
`
const TestData: DateData = {
  day: 1,
  activities: [
    {
      name: 'Activity 1',
      amount: 25,
      goal: 40,
      type: 'cardio',
      bodyPart: 'legs',
    },
    {
      name: 'Activity 2',
      amount: 30,
      goal: 30,
      type: 'cardio',
      bodyPart: 'core',
    },
    {
      name: 'Activity 3',
      amount: 3,
      goal: 13,
      type: 'strength',
      bodyPart: 'arms',
    },
    {
      name: 'Activity 4',
      amount: 10,
      goal: 25,
      type: 'strength',
      bodyPart: 'legs',
    },
  ],
  from: '10:00',
  to: '11:00',
  notes: 'Notes',
}
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
  const {setDayData} = useMainStore((state) => state.actions)
  const {monthData, dayData} = useMainStore((state) => state)
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
          {dayData.from && dayData.to && (
            <DataRow>
              Time:
              <span>
                {dayData.from} - {dayData.to}
              </span>
            </DataRow>
          )}
          {dayData.activities.map((activity) => (
            <DataRow key={activity.name}>
              {activity.name}:
              <span>
                {activity.amount} / {activity.goal}
              </span>
            </DataRow>
          ))}
          <Notes day={dayData.day - 1} currentNotes={dayData.notes} />
        </>
      )}
    </Wrapper>
  )
}

export default DatePage
