import React, { useState } from 'react'
import { Activity } from '../../../models/Activity'
import styled from 'styled-components'

type Props = {
  day: number,
  currentActivities: Activity[]
}

const AddActivity = styled.button`
  all: unset;
  cursor: pointer;

  padding: 10px 15px;
  font-size: ${({theme}) => theme.fontSizes.large};
  color: ${({theme}) => theme.textColors.secondary};
  font-weight: bold;

  border-radius: 5px;
  border: 2px solid ${({theme}) => theme.textColors.secondary};
`
const AddForm = styled.form`
  display: flex;
  flex-wrap: row nowrap;
  width: 100%;
`
const FormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${({theme}) => theme.textColors.secondary};
  font-size: ${({theme}) => theme.fontSizes.medium};
  &:first-child {
    flex-grow: 1;
  }
`
const Input = styled.input`
  all: unset;
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid ${({theme}) => theme.textColors.secondary};
  color: ${({theme}) => theme.textColors.primary};
  font-size: ${({theme}) => theme.fontSizes.medium};
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

const ActivitiesList = ({day, currentActivities}: Props) => {
  const [adding, setAdding] = useState(false)
  return (
    <>
      {currentActivities.map((activity) => (
        <DataRow key={activity.name}>
          {activity.name}:
          <span>
            {activity.amount} / {activity.goal}
          </span>
        </DataRow>
      ))}
      {adding ? (
        <AddForm>
          <FormCol>
            Activity name
            <Input type="text" autoCapitalize='on' />
          </FormCol>
          <FormCol>
            From
            
          </FormCol>
        </AddForm>
      ) : (
        <AddActivity onClick={() => setAdding(true)}>Add activity +</AddActivity>
      )}
    </>
  )
}

export default ActivitiesList