import { useEffect } from 'react'
import { useStoreMain, useStoreMainActions } from '../../store'

const ActivitiesPage = () => {
  const activities = useStoreMain((state) => state.availableActivities)
  const {getActivitiesList} = useStoreMainActions()

  useEffect(() => {
    if (activities.length === 0) {
      getActivitiesList()
    }
  }, [])
  return (
    <>
      <h1>Activities page</h1>
      <span>Gonna be used for suggestions</span>
      {activities.map((activity) => (
        <span key={activity}>{activity}</span>
      ))}
    </>
  )
}

export default ActivitiesPage