import { useEffect } from 'react'
import { useStoreMain, useStoreMainActions } from '../../store'
import styled from 'styled-components'
import { PageContainer } from '../../components/PageContainer'

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
  const activities = useStoreMain((state) => state.availableActivities)
  const {getAvailableActivities, deleteAvailableActivity} = useStoreMainActions()

  const handleDelete = (activity: string) => {
    deleteAvailableActivity(activity)
  }

  useEffect(() => {
    if (activities.length === 0) {
      getAvailableActivities()
    }
  }, [])
  return (
    <PageContainer>
      <h1>Activities page</h1>
      <ActivityList>
        {activities.length === 0 && <span>No activities added yet</span>}
        {activities.map((activity) => (
          <ActivityItem key={activity}>
            <span>{activity}</span>
            <DeleteButton onClick={() => handleDelete(activity)}>Delete</DeleteButton>
          </ActivityItem>
        ))}
      </ActivityList>
    </PageContainer>
  )
}

export default ActivitiesPage