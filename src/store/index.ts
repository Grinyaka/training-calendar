import {create} from 'zustand'
import {DateData} from '../models/DateData'
import {Activity} from '../models/Activity'
import {JsonObject} from '../utils/JsonObject'

const LOCAL_STORAGE_NAME = '{month}_monthData'

interface MainData {
  monthData: DateData[]
  currentMonth: number
  dayData?: DateData

  actions: {
    getMonthData: () => DateData[]
    setMonthData: (data: DateData[]) => void
    addActivity: ({activity, day}: {activity: Activity; day: number}) => void
    removeActivity: ({activity, day}: {activity: string; day: number}) => void
    updateActivity: ({activity, day}: {activity: Activity; day: number}) => void
    addNotes: ({day, notes}: {day: number; notes: string}) => void
    setTime: ({time, type}: {time: string; type: 'from' | 'to'}) => void
    setDayData: (day?: number) => void
  }
}

const DEFAULT_PROPS = {
  monthData: [],
  currentMonth: new Date().getMonth(),
  dayData: undefined,
}

export const useStoreMain = create<MainData>((set, get) => ({
  monthData: DEFAULT_PROPS.monthData,
  currentMonth: DEFAULT_PROPS.currentMonth,
  dayData: DEFAULT_PROPS.dayData,
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
      let currentMonthData = [...get().monthData]
      currentMonthData[day] = {
        ...currentMonthData[day],
        notes,
      }
      get().actions.setMonthData(currentMonthData)
      return get().actions.setDayData(day)
    },
    setTime: ({time, type}: {time: string; type: 'from' | 'to'}) => {
      let currentMonthData = [...get().monthData]
      const dayData = {...get().dayData!}
      const currentDay = dayData.day - 1
      currentMonthData[currentDay] = {
        ...currentMonthData[currentDay],
        [type]: time,
      }
      get().actions.setMonthData(currentMonthData)
      return get().actions.setDayData(currentDay)
    },
    addActivity: ({activity, day}: {activity: Activity; day: number}) => {
      let currentMonthData = [...get().monthData]
      currentMonthData[day] = {
        ...currentMonthData[day],
        activities: [...currentMonthData[day].activities, activity],
      }
      get().actions.setMonthData(currentMonthData)
      return get().actions.setDayData(day)
    },
    removeActivity: ({activity, day}: {activity: string; day: number}) => {
      let currentMonthData = [...get().monthData]
      currentMonthData[day] = {
        ...currentMonthData[day],
        activities: currentMonthData[day].activities.filter(
          (item) => item.name !== activity,
        ),
      }
      get().actions.setMonthData(currentMonthData)
      return get().actions.setDayData(day)
    },
    updateActivity: ({activity, day}: {activity: Activity; day: number}) => {
      let currentMonthData = [...get().monthData]
      currentMonthData[day] = {
        ...currentMonthData[day],
        activities: currentMonthData[day].activities.map((item) => {
          if (item.name === activity.name) {
            return activity
          }
          return item
        }),
      }
      get().actions.setMonthData(currentMonthData)
      return get().actions.setDayData(day)
    },
    setDayData: (day?: number) => {
      if (day === undefined) {
        return set((state) => ({dayData: DEFAULT_PROPS.dayData}))
      }
      const currentMonthData = [...get().monthData]
      if (!currentMonthData || currentMonthData.length === 0) {
        const newData = {...get().actions.getMonthData()}
        return set((state) => ({dayData: newData[day]}))
      }
      return set({dayData: currentMonthData[day]})
    },
  },
}))

export const useStoreMainActions = () => useStoreMain((state) => state.actions)
