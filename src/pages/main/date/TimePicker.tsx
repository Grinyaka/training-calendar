import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useStoreMain } from '../../../store'

type Props = {
  from?: string
  to?: string
}
const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`
const OpenButton = styled.button`
  all: unset;
  box-sizing: border-box;

  border: 2px solid ${({theme}) => theme.textColors.secondary};
  border-radius: 5px;
  color: ${({theme}) => theme.textColors.primary};
  padding: 5px 10px;
  font-size: ${({theme}) => theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  border-radius: 5px;
  background-color: ${({theme}) => theme.backgroundColors.card};
  color: ${({theme}) => theme.textColors.secondary};
  padding-right: 10px;
  max-height: 200px;
  overflow-y: scroll;
  width: fit-content;

  z-index: 10;

  display: flex;
  flex-direction: column;
`
const MenuItem = styled.button`
  all: unset;
  cursor: pointer;
  padding: 10px 15px;
  font-size: ${({theme}) => theme.fontSizes.small};
  font-weight: bold;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: ${({theme}) => theme.backgroundColors.buttonHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
const availableMinutes = ['00', '15', '30', '45']
const availableHours = Array.from({length: 24}, (_, i) => {
  if (i < 10) {
    return `0${i}`
  }
  return `${i}`
})
const availableTime = availableHours.flatMap((hour) =>
  availableMinutes.map((minute) => `${hour}:${minute}`),
)

type MenuType = 'from' | 'to'
const TimePicker = ({from, to}: Props) => {
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  const [currentFrom, setCurrentFrom] = useState(from)
  const [currentTo, setCurrentTo] = useState(to)

  const fromMenuRef = useRef<HTMLDivElement>(null)
  const toMenuRef = useRef<HTMLDivElement>(null)
  const {setTime} = useStoreMain((state) => state.actions)

  const handleTimeChange = (time: string, type: MenuType) => {
    if (type === 'from') {
      setCurrentFrom(time)
    } else {
      setCurrentTo(time)
    }
    setTime({time, type})
  }
  const handleOpen = (type: MenuType) => {
    if (type === 'from') {
      setFromOpen(!fromOpen)
    } else {
      setToOpen(!toOpen)
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLButtonElement, Element>,
    type: MenuType,
  ) => {
    const focusTarget = e.relatedTarget
    if (
      (type === 'from' &&
        fromMenuRef.current &&
        !fromMenuRef.current.contains(focusTarget)) ||
      !focusTarget
    ) {
      return setFromOpen(false)
    }
    if (
      (type === 'to' && toMenuRef.current && !toMenuRef.current.contains(focusTarget)) ||
      !focusTarget
    ) {
      return setToOpen(false)
    }
  }

  const handleClick = (value: string, type: MenuType) => {
    handleTimeChange(value, type)
    if (type === 'from') {
      setFromOpen(false)
    } else {
      setToOpen(false)
    }
  }
  return (
    <>
      Time:
      <Wrapper>
        <OpenButton
          onBlur={(e) => handleBlur(e, 'from')}
          onClick={() => handleOpen('from')}
        >
          {currentFrom || 'Select'} ↓
        </OpenButton>
        {fromOpen && (
          <MenuDropdown ref={fromMenuRef}>
            {availableTime.map((time) => (
              <MenuItem
                disabled={time === currentFrom}
                key={time}
                onClick={() => handleClick(time, 'from')}
              >
                {time}
              </MenuItem>
            ))}
          </MenuDropdown>
        )}
      </Wrapper>
      -
      <Wrapper>
        <OpenButton onBlur={(e) => handleBlur(e, 'to')} onClick={() => handleOpen('to')}>
          {currentTo || 'Select'} ↓
        </OpenButton>
        {toOpen && (
          <MenuDropdown ref={toMenuRef}>
            {availableTime.map((time) => (
              <MenuItem
                disabled={time === currentTo}
                key={time}
                onClick={() => handleClick(time, 'to')}
              >
                {time}
              </MenuItem>
            ))}
          </MenuDropdown>
        )}
      </Wrapper>
    </>
  )
}

export default TimePicker
