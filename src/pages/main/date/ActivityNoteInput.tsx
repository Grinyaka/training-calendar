import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Activity } from '../../../models/Activity'
import { useDebounce } from '../../../utils/useDebounce'

type Props = {
  activity: Activity
  onChange: (activity: Activity) => void
}

const Input = styled.input`
  all: unset;

  border-bottom: 2px solid ${({theme}) => theme.textColors.secondary};
  flex-grow: 1;
  padding: 5px;
  font-size: clamp(
    ${({theme}) => theme.fontSizes.small},
    3vw,
    ${({theme}) => theme.fontSizes.medium}
  );

  color: ${({theme}) => theme.textColors.secondary};

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

const ActivityNoteInput = ({activity, onChange}: Props) => {
  const [newValue, setNewValue] = useState(activity.note || '')
  const debouncedValue = useDebounce(newValue, 500)
  const firstRender = useRef(true)

  useEffect(() => {
    if (!firstRender.current) {
      onChange({...activity, note: debouncedValue})
    } else {
      firstRender.current = false
    }

    return () => {
      if (firstRender.current) {
        firstRender.current = false
      }
    }
  }, [debouncedValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setNewValue(value)
  }

  return <Input placeholder="" value={newValue} onChange={handleChange} />
}

export default ActivityNoteInput
