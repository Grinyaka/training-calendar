import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Activity } from '../../../models/Activity'
import { useDebounce } from '../../../utils/useDebounce'

type Props = {
  activity: Activity
  inputType: 'amount' | 'goal'
  onChange: (activity: Activity) => void
}

const Input = styled.input`
  all: unset;

  border-bottom: 2px solid ${({theme}) => theme.textColors.secondary};
  width: 3ch;
  padding: 2px;
  font-size: clamp(
    ${({theme}) => theme.fontSizes.small},
    3vw,
    ${({theme}) => theme.fontSizes.medium}
  );

  text-align: end;

  &:active,
  &:focus {
    border-color: ${({theme}) => theme.textColors.primary};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`

const ActivityAmountInput = ({activity, inputType, onChange}: Props) => {
  const [newValue, setNewValue] = useState(activity[inputType]?.toString() || '')
  const debouncedValue = useDebounce(newValue, 500)
  const firstRender = useRef(true)

  useEffect(() => {
    if (!firstRender.current) {
      onChange({...activity, [inputType]: debouncedValue})
    } else {
      firstRender.current = false
    }

    return () => {
      if (firstRender.current) {
        firstRender.current = false
      }
    }
  }, [debouncedValue])

  // Not my problem if you wanna put other than numbers... For now
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const regex = /^[0-9]*$/
    let value = e.target.value
    if (regex.test(value)) {
      setNewValue(value)
    }
  }

  return (
    <Input
      type="number"
      maxLength={3}
      placeholder="0"
      value={newValue}
      onChange={handleChange}
    />
  )
}

export default ActivityAmountInput
