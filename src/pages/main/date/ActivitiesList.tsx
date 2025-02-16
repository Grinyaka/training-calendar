import React, { useState } from 'react'
import { Activity } from '../../../models/Activity'
import styled from 'styled-components'
import AddActivity from './AddActivity'
import { useStoreMain } from '../../../store'
import { shallow } from 'zustand/shallow'

type Props = {
  day: number
}

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

const ActivitiesList = ({day}: Props) => {
  const data = useStoreMain((state) => state.dayData)
  const activities = data.activities
  if (!activities) return <>Loading...</>
  return (
    <>
      {activities.map((activity) => (
        <DataRow key={activity.name}>
          {activity.name}:
          <span>
            {activity.amount || 0} / {activity.goal || 0}
          </span>
        </DataRow>
      ))}
      <AddActivity day={day} />
    </>
  )
}

export default ActivitiesList