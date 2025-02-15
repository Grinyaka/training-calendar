import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  width: 100%;

  padding: 10px;

  overflow-y: scroll;

  @media (max-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(11, 1fr);
  }
`
const DayBtn = styled(Link)`
  all: unset;

  aspect-ratio: 1;

  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;

  background-color: ${({theme}) => theme.backgroundColors.card};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  font-size: ${({theme}) => theme.fontSizes.medium};

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

`
const DateTitle = styled.span`
  line-height: 1;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
`
const DateActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
   
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  >span {
    font-size: ${({theme}) => theme.fontSizes.small};
    color: ${({theme}) => theme.textColors.secondary};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 5px;
    line-height: 1;
  }
`

const DatePicker = () => {
  const dates = Array.from({length: 31}, (_, i) => i + 1)
  return (
    <Wrapper>
      {dates.map((date) => (
        <DayBtn key={date} to={`/${date}`}>
          <DateTitle>{date}</DateTitle>
          <DateActivity>
            <span>Activity 1</span>
            <span>Activity 2</span>
            <span>Activity 3</span>
            <span>Activity 4</span>
            <span>...</span>
          </DateActivity>
        </DayBtn>
      ))}
    </Wrapper>
  )
}

export default DatePicker