import moment from 'moment'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useStoreMain } from '../../store'
import { useEffect, useRef } from 'react'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  width: 100%;

  padding: 10px;

  max-width: 1400px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(11, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(16, 1fr);
  }
`
const DayBtn = styled(Link)<{$active: boolean, $isToday: boolean}>`
  all: unset;

  aspect-ratio: 1;

  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;

  background-color: ${({theme, $active}) =>
    $active ? theme.backgroundColors.card : theme.backgroundColors.secondary};
  border: 2px solid ${({theme, $isToday}) => $isToday ? theme.backgroundColors.accent : theme.backgroundColors.card};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  font-size: ${({theme}) => theme.fontSizes.medium};

  &:hover {
    opacity: 0.8;
  }
`
const DateTitle = styled.span`
  line-height: 1;
  font-size: clamp(
    ${({theme}) => theme.fontSizes.medium},
    2vw,
    ${({theme}) => theme.fontSizes.xlarge}
  );
  color: ${({theme}) => theme.textColors.secondary};
`
const DateActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  > span {
    font-size: ${({theme}) => theme.fontSizes.small};
    color: ${({theme}) => theme.textColors.secondary};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 5px;
    line-height: 1.2;
  }
`

const DatePicker = () => {
  const monthData = useStoreMain((state) => state.monthData)
  const currentMonth = useStoreMain((state) => state.currentMonth)
  const daysInMonth = moment().daysInMonth()
  const dates = Array.from({length: daysInMonth}, (_, i) => i + 1)
  const today = moment.now()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const getCurrentDate = (day: number) => {
    const date = `2025-${currentMonth}-${day}`
    const formatted = moment(date).format('DD ddd')
    return formatted
  }
  const checkIfToday = (day: number) => {
    const date = `2025-${currentMonth}-${day}`
    return moment(date).isSame(today, 'day')
  }
  const pastCurrentDate = (day: number) => {
    const date = `2025-${currentMonth}-${day}`
    return moment(date).isBefore(today) && !checkIfToday(day)
  }



  useEffect(() => {
    if (!!wrapperRef.current) {
      const scrollToToday = () => {
        const todayIndex = dates.findIndex((date) => date === moment().date())
        const todayElement = wrapperRef.current?.children[todayIndex]
        if (todayElement) {
          todayElement.scrollIntoView({behavior: 'smooth'})
        }
      }
      scrollToToday()
  }
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      {dates.map((date) => (
        <DayBtn
          key={date}
          to={`/${date}`}
          $active={!pastCurrentDate(date)}
          $isToday={checkIfToday(date)}
        >
          <DateTitle>{getCurrentDate(date)}</DateTitle>
          <DateActivity>
            {monthData[date - 1]?.activities?.length > 0 &&
              monthData[date - 1]?.activities?.map((activity, index) => (
                <span key={activity.name + index}>{activity.name}</span>
              ))}
          </DateActivity>
        </DayBtn>
      ))}
    </Wrapper>
  )
}

export default DatePicker
