import React, { useState } from 'react'
import styled from 'styled-components'
import { Activity } from '../../../models/Activity'
import { useStoreMain } from '../../../store'

type Props = {
  day: number
}

const AddForm = styled.form`
  display: flex;
  flex-wrap: row nowrap;
  width: 100%;
  gap: 5px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`
const Input = styled.input`
  all: unset;
  padding: 10px 15px;
  border-radius: 5px;
  border: 2px solid ${({theme}) => theme.textColors.secondary};
  color: ${({theme}) => theme.textColors.primary};
  font-size: clamp(
    ${({theme}) => theme.fontSizes.small},
    3vw,
    ${({theme}) => theme.fontSizes.medium}
  );
  flex-grow: 1;

  &::placeholder {
    font-weight: bold;
    opacity: 0.5;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`
const SubmitButton = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 15px;
  font-size: clamp(
    ${({theme}) => theme.fontSizes.small},
    3vw,
    ${({theme}) => theme.fontSizes.medium}
  );
  color: ${({theme}) => theme.textColors.secondary};
  font-weight: bold;
  background-color: ${({theme}) => theme.backgroundColors.accent};
  border-radius: 5px;
  border: 2px solid transparent;
  color: ${({theme}) => theme.textColors.dark};
  transition: all 0.2s ease-in-out;

  text-transform: uppercase;

  text-align: center;
  &:not(:disabled):hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: transparent;
    border-color: ${({theme}) => theme.backgroundColors.accent};
    opacity: 0.5;
    color: ${({theme}) => theme.textColors.secondary};
    cursor: default;
  }

  @media (max-width: 600px) {
    flex-grow: 1;
  }
`
const CancelButton = styled(SubmitButton)`
  background-color: transparent;
  border-color: ${({theme}) => theme.backgroundColors.negative};
  color: ${({theme}) => theme.textColors.primary};
  @media (max-width: 600px) {
    flex-grow: 0;
  }
`
const AddButton = styled.button`
  all: unset;
  cursor: pointer;

  padding: 10px 15px;
  font-size: clamp(
    ${({theme}) => theme.fontSizes.small},
    3vw,
    ${({theme}) => theme.fontSizes.medium}
  );
  color: ${({theme}) => theme.textColors.secondary};
  font-weight: bold;

  border-radius: 5px;
  border: 2px solid ${({theme}) => theme.textColors.secondary};
`

const AddActivity = ({day}: Props) => {
  const [adding, setAdding] = useState(false)
  const [newActivity, setNewActivity] = useState('')
  const {addActivity} = useStoreMain((state) => state.actions)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewActivity(e.target.value)
  }
  const handleClose = () => {
    setAdding(false)
    setNewActivity('')
  }

  const handleOpen = () => {
    setAdding(true)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newActivity) {
      addActivity({day, activityName: newActivity})
      handleClose()
    }
  }

  return adding ? (
    <AddForm onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        type="text"
        autoCapitalize="on"
        placeholder="Activity name"
        autoFocus
      />
      <SubmitButton disabled={!newActivity} type="submit">
        Add
      </SubmitButton>
      <CancelButton onClick={handleClose}>Cancel</CancelButton>
    </AddForm>
  ) : (
    <AddButton onClick={handleOpen}>Add activity +</AddButton>
  )
}

export default AddActivity
