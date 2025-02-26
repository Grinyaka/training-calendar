import moment from 'moment'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useShallow } from 'zustand/shallow'
import { useStoreMonth } from '../../store/calendarStore'

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
const DayBtn = styled(Link)<{$active: boolean; $isToday: boolean}>`
  all: unset;

  aspect-ratio: 1;

  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;

  background-color: ${({theme, $active}) =>
    $active ? theme.backgroundColors.card : theme.backgroundColors.secondary};
  border: 2px solid
    ${({theme, $isToday}) =>
      $isToday ? theme.backgroundColors.accent : theme.backgroundColors.card};
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
  const {monthData, daysInMonth, currentMonth} = useStoreMonth(
    useShallow((state) => ({
      monthData: state.data,
      daysInMonth: state.totalDays,
      currentMonth: state.currentMonth,
    })),
  )

  const dates = Array.from({length: daysInMonth}, (_, i) => {
    return moment({year: 2025, month: currentMonth, day: i + 1}).format('YYYY-MM-DD')
  })
  const today = moment()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const checkIfToday = (date: string) => {
    return moment(date).isSame(today, 'day')
  }
  const pastCurrentDate = (date: string) => {
    return moment(date).isBefore(today) && !checkIfToday(date)
  }

  useEffect(() => {
    if (!!wrapperRef.current) {
      const scrollToToday = () => {
        const todayIndex = dates.findIndex((date) => moment(today).isSame(date, 'day'))
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
          <DateTitle>{moment(date).format('DD ddd')}</DateTitle>
          <DateActivity>
            {monthData.has(date) &&
              monthData.get(date).activities.map((activity, index) => (
                <span key={activity.category + index}>
                  {activity.category}:{activity.bodyPart}
                </span>
              ))}
          </DateActivity>
        </DayBtn>
      ))}
    </Wrapper>
  )
}

export default DatePicker
