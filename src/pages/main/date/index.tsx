import moment from 'moment'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import styled from 'styled-components'
import {PageContainer} from '../../../components/PageContainer'
import {useStoreMain} from '../../../store'
import ActivitiesList from './ActivitiesList'
import Notes from './Notes'
import TimePicker from './TimePicker'
import {useShallow} from 'zustand/shallow'

const Wrapper = styled(PageContainer)`
  align-items: start;
  max-width: 900px;

  padding: 15px;
  gap: 15px;
`
const Title = styled.span`
  font-size: clamp(
    ${({theme}) => theme.fontSizes.large},
    3vw,
    ${({theme}) => theme.fontSizes.xlarge}
  );
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
const StyledHr = styled.hr`
  width: 80%;
  border: 1px solid ${({theme}) => theme.textColors.secondary};
`
const DataList = styled.datalist`
  display: flex;
  flex-direction: column;
  gap:2px;
  max-height: 200px;
  overflow-y: scroll;

  &>option {
    color: ${({theme}) => theme.textColors.primary};
    font-size: clamp(
      ${({theme}) => theme.fontSizes.small},
      3vw,
      ${({theme}) => theme.fontSizes.medium}
    );

  }
`

const DatePage = () => {
  const {date} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const {setDayData, getAvailableActivities} = useStoreMain((state) => state.actions)
  const {dayData, currentMonth, availableActivities} = useStoreMain(
    useShallow((state) => ({
      dayData: state.dayData,
      currentMonth: state.currentMonth,
      availableActivities: state.availableActivities,
    })),
  )

  // TODO: add year (not important until 2026)
  const currentDate = `2025-${currentMonth}-${date}`
  const dayOfWeek = moment(currentDate).format('dddd')
  const month = moment(currentDate).format('MMMM')

  useEffect(() => {
    setDayData(Number(date) - 1)
    setIsLoading(false)
    if (availableActivities.length === 0) {
      getAvailableActivities()
    }
  }, [])

  return (
    <Wrapper>
      <Title>
        {month} {date}, {dayOfWeek}
      </Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <DataRow>
            <TimePicker from={dayData.from} to={dayData.to} />
          </DataRow>
          <StyledHr />
          <DataRow>Activities:</DataRow>
          <ActivitiesList day={dayData.day - 1} />
          <Notes day={dayData.day - 1} currentNotes={dayData.notes} />
          <DataList id="activitiesList">
            {availableActivities.map((activity) => (
              <option key={activity}>{activity}</option>
            ))}  
          </DataList>
        </>
      )}
    </Wrapper>
  )
}

export default DatePage
