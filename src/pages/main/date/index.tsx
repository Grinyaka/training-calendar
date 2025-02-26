import moment from 'moment'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { PageContainer } from '../../../components/PageContainer'
import { useStoreDay } from '../../../store/dayStore'
import ActivitiesList from './ActivitiesList'
import Notes from './Notes'
import TimePicker from './TimePicker'

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

const DatePage = () => {
  const {date} = useParams()
  const {fetchDayData} = useStoreDay((state) => state.actions)

  useEffect(() => {
    fetchDayData(date)
    // if (availableActivities.length === 0) {
    //   getAvailableActivities()
    // }
  }, [])

  return (
    <Wrapper>
      <Title>{moment(date).format('MMMM DD dddd')}</Title>
      <DataRow>
        <TimePicker />
      </DataRow>
      <StyledHr />
      <DataRow>Activities:</DataRow>
      <ActivitiesList />
      <Notes />
      {/* {availableActivities.length > 0 && (
        <datalist id="activitiesList">
          {availableActivities.map((activity) => (
            <option key={activity}>{activity}</option>
          ))}
        </datalist>
      )} */}
    </Wrapper>
  )
}

export default DatePage
