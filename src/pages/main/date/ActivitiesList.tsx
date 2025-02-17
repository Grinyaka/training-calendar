import React, { useState } from 'react'
import { Activity } from '../../../models/Activity'
import styled from 'styled-components'
import AddActivity from './AddActivity'
import { useStoreMain, useStoreMainActions } from '../../../store'
import { shallow } from 'zustand/shallow'

type Props = {
  day: number
}

const DataRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: clamp(${({theme}) => theme.fontSizes.small}, 3vw, ${({theme}) => theme.fontSizes.medium});

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

const DeleteButton = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px;
  font-size: ${({theme}) => theme.fontSizes.small};
  color: ${({theme}) => theme.backgroundColors.negative};
  opacity: 0.4;
`

const ActivitiesList = ({day}: Props) => {
  const data = useStoreMain((state) => state.dayData)
  const {removeActivity} = useStoreMainActions()
  const activities = data?.activities || []

  const handleDelete = (activity: Activity) => {
    removeActivity({activity: activity.name, day})
  }
  return (
    <>
      {activities.map((activity) => (
        <DataRow key={activity.name}>
          {activity.name}:
          <span>
            {activity.amount || 0} / {activity.goal || 0}
          </span>
          <DeleteButton onClick={() => handleDelete(activity)}>Delete</DeleteButton>
        </DataRow>
      ))}
      <AddActivity day={day} />
    </>
  )
}

export default ActivitiesList