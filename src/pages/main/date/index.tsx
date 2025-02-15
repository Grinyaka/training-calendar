import {useParams} from 'react-router'
import {PageContainer} from '../../../components/PageContainer'
import {DateData} from '../../../models/DateData'
import {Activity} from '../../../models/Activity'
import styled from 'styled-components'
import { useMainStore } from '../../../store'

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
const Notes = styled.div`
  background-color: ${({theme}) => theme.backgroundColors.card};
  border-radius: 5px;

  width: 100%;
  padding: 10px 15px;
`
const DatePage = () => {
  const {date} = useParams()
  return (
    <Wrapper>
      <Title>{date}</Title>
      <DataRow>
        Time:
        <span>
          {TestData.from} - {TestData.to}
        </span>
      </DataRow>
      {TestData.activities.map((activity) => (
        <DataRow key={activity.name}>
          {activity.name}:
          <span>
            {activity.amount} / {activity.goal}
          </span>
        </DataRow>
      ))}
      <Notes>{TestData.notes}</Notes>
    </Wrapper>
  )
}

export default DatePage
