import styled from 'styled-components'
import { Activity } from '../../../models/Activity'
import { useStoreDay } from '../../../store/dayStore'
import AddActivity from './AddActivity'

const ActivityElement = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: clamp(
    ${({theme}) => theme.fontSizes.small},
    3vw,
    ${({theme}) => theme.fontSizes.medium}
  );

  color: ${({theme}) => theme.textColors.primary};
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;

  background-color: ${({theme}) => theme.backgroundColors.card};
  border-radius: 5px;

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
  padding: 0;
  font-size: ${({theme}) => theme.fontSizes.small};
  width: 25px;
  height: 25px;
  text-align: center;
  color: ${({theme}) => theme.backgroundColors.negative};
  opacity: 0.4;
  border: 2px solid ${({theme}) => theme.backgroundColors.negative};
  border-radius: 5px;
`

const ActivitiesList = () => {
  const activities = useStoreDay((state) => state.currentFormValues.activities)
  const {removeActivity} = useStoreDay((state) => state.actions)

  const handleDelete = (activity: Activity) => {
    removeActivity(activity)
  }

  return (
    <>
      {activities.map((activity, index) => (
        <ActivityElement key={activity.name + index}>
          {activity.name}
          <DeleteButton onClick={() => handleDelete(activity)}>X</DeleteButton>
        </ActivityElement>
      ))}
      <AddActivity />
    </>
  )
}

export default ActivitiesList
