import {create} from 'zustand'
import {Activity} from '../models/Activity'
import {DateData} from '../models/DateData'
import {JsonObject} from '../utils/JsonObject'

const LOCAL_STORAGE_NAME = '{month}_monthData'
const LOCAL_STORAGE_ACTIVITIES = 'availableActivities'

interface MainData {
  monthData: DateData[]
  currentMonth: number
  dayData?: DateData
  availableActivities: string[]

  actions: {
    getMonthData: () => DateData[]
    setMonthData: (data: DateData[]) => void
    addActivity: ({activityName, day}: {activityName: string; day: number}) => void
    removeActivity: ({activityId, day}: {activityId: number; day: number}) => void
    updateActivity: ({activity, day}: {activity: Activity; day: number}) => void
    addNotes: ({day, notes}: {day: number; notes: string}) => void
    setTime: ({time, type}: {time: string; type: 'from' | 'to'}) => void
    setDayData: (day?: number) => void

    addAvailableActivity: (activity: string) => void
    deleteAvailableActivity: (activity: string) => void
    getAvailableActivities: () => string[]
  }
}

const DEFAULT_PROPS = {
  monthData: [],
  currentMonth: new Date().getMonth() + 1,
  dayData: undefined,
  availableActivities: [],
}

export const useStoreMain = create<MainData>()((set, get) => ({
  monthData: DEFAULT_PROPS.monthData,
  currentMonth: DEFAULT_PROPS.currentMonth,
  dayData: DEFAULT_PROPS.dayData,
  availableActivities: DEFAULT_PROPS.availableActivities,
  actions: {
    getMonthData: (): DateData[] => {
      const currentMonth = get().currentMonth
      const data = localStorage.getItem(
        `${LOCAL_STORAGE_NAME.replace('{month}', currentMonth.toString())}`,
      )
      if (!data) return []
      const json: JsonObject<DateData>[] = JSON.parse(data)
      const result = json.map(DateData.valueOfJson)
      if (!result) return []
      set({monthData: result})
      return result
    },
    setMonthData: (data: DateData[]) => {
      const currentMonth = get().currentMonth
      localStorage.setItem(
        `${LOCAL_STORAGE_NAME.replace('{month}', currentMonth.toString())}`,
        JSON.stringify(data),
      )

      return set((state) => ({
        ...state,
        monthData: data,
      }))
    },
    addNotes: ({day, notes}: {day: number; notes: string}) => {
      return set((state) => {
        const newDayData = {
          ...state.dayData,
          notes,
        }
        let newMonthData = [...state.monthData]
        newMonthData[day] = newDayData
        get().actions.setMonthData(newMonthData)
        return {dayData: newDayData, monthData: newMonthData}
      })
    },
    setTime: ({time, type}: {time: string; type: 'from' | 'to'}) => {
      return set((state) => {
        const newDayData = {
          ...state.dayData,
          [type]: time,
        }
        let newMonthData = [...state.monthData]
        newMonthData[newDayData.day - 1] = newDayData
        get().actions.setMonthData(newMonthData)
        return {dayData: newDayData, monthData: newMonthData}
      })
    },
    addActivity: ({activityName, day}: {activityName: string; day: number}) => {
      set((state) => {
        const newId = state.dayData?.activities.length
          ? state.dayData?.activities[state.dayData?.activities?.length - 1].id + 1
          : 0
        const newActivity = new Activity(newId, activityName)
        const newDayData = {
          ...state.dayData,
          activities: [...state.dayData!.activities, newActivity],
        }
        let newMonthData = [...state.monthData]
        newMonthData[day] = newDayData
        get().actions.setMonthData(newMonthData)
        get().actions.addAvailableActivity(activityName)
        return {
          dayData: newDayData,
          monthData: newMonthData,
        }
      })
    },
    removeActivity: ({activityId, day}: {activityId: number; day: number}) => {
      set((state) => {
        const newDayData = {
          ...state.dayData,
          activities: state.dayData.activities.filter((item) => item.id !== activityId),
        }
        let newMonthData = [...state.monthData]
        newMonthData[day] = newDayData
        get().actions.setMonthData(newMonthData)
        return {dayData: newDayData, monthData: newMonthData}
      })
    },
    updateActivity: ({activity, day}: {activity: Activity; day: number}) => {
      set((state) => {
        const newDayData = {
          ...state.dayData,
          activities: state.dayData.activities.map((item) => {
            if (item.name === activity.name) {
              return activity
            }
            return item
          }),
        }
        let newMonthData = [...state.monthData]
        newMonthData[day] = newDayData
        get().actions.setMonthData(newMonthData)
        return {dayData: newDayData, monthData: newMonthData}
      })
    },
    setDayData: (day?: number) => {
      if (day === undefined) {
        return set((state) => ({dayData: DEFAULT_PROPS.dayData}))
      }
      const currentMonthData = [...get().monthData]
      if (!currentMonthData || currentMonthData.length === 0) {
        const newData = {...get().actions.getMonthData()}
        if (!newData[day]) {
          const emptyDayData = new DateData(day + 1, [])
          return set((state) => ({dayData: emptyDayData}))
        }
        return set((state) => ({dayData: newData[day]}))
      }
      const newDayData = DateData.valueOfJson({
        ...currentMonthData[day],
        day: day + 1,
      })
      return set({dayData: newDayData})
    },

    addAvailableActivity: (activity: string) => {
      let storeData = [...get().availableActivities]
      storeData = Array.from(new Set([activity, ...storeData]))
      localStorage.setItem(LOCAL_STORAGE_ACTIVITIES, JSON.stringify(storeData))
      set({availableActivities: storeData})
    },
    getAvailableActivities: () => {
      const data = localStorage.getItem(LOCAL_STORAGE_ACTIVITIES)
      const response = data ? JSON.parse(data) : []
      set({availableActivities: response})
      return response
    },
    deleteAvailableActivity: (activity: string) => {
      const storeData = [...get().availableActivities]
      const newResponse = storeData.filter((item: string) => item !== activity)
      localStorage.setItem(LOCAL_STORAGE_ACTIVITIES, JSON.stringify(newResponse))
      set({availableActivities: newResponse})
    },
  },
}))

export const useStoreMainActions = () => useStoreMain((state) => state.actions)
