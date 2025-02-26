import { useEffect } from 'react'
import styled from 'styled-components'
import { PageContainer } from '../../components/PageContainer'
import { useStoreDay } from '../../store/dayStore'
import { useStoreActivities } from '../../store/activitiesStore'
import { Activity } from '../../models/Activity'

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  max-width: 900px;
  align-items: center;
  width: 100%;
  flex-grow: 1;

  >span:first-child {
    color: ${({theme}) => theme.textColors.secondary};
    font-size: ${({theme}) => theme.fontSizes.small};
    opacity: 0.5;
  }
`
const ActivityItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;

  max-width: 600px;
  align-items: center;

  padding: 5px 10px;

  background-color: ${({theme}) => theme.backgroundColors.card};
  border-radius: 5px;
`
const DeleteButton = styled.button`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px;
  font-size: ${({theme}) => theme.fontSizes.small};
  color: ${({theme}) => theme.backgroundColors.negative};
  opacity: 0.4;
  margin-left: auto;
`

const ActivitiesPage = () => {
  const activities = useStoreActivities((state) => state.data)
  const {fetchAvailableActivities, removeAvailableActivity} = useStoreActivities(state => state.actions)

  const handleDelete = (activity: Activity) => {
    removeAvailableActivity(activity)
  }

  useEffect(() => {
    if (activities.length === 0) {
      fetchAvailableActivities()
    }
  }, [])
  return (
    <PageContainer>
      <h1>Activities page</h1>
      <ActivityList>
        {activities.length === 0 && <span>No activities added yet</span>}
        {activities.map((activity) => (
          <ActivityItem key={activity.name}>
            <span>{activity.name}</span>
            <DeleteButton onClick={() => handleDelete(activity)}>Delete</DeleteButton>
          </ActivityItem>
        ))}
      </ActivityList>
    </PageContainer>
  )
}

export default ActivitiesPage