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
  currentMonth: new Date().getMonth() + 1,
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
      console.log(json)
      const result = json.map(DateData.valueOfJson)
      if (!result) return []
      set({monthData: result})
      return result
    },
    setMonthData: (data: DateData[]) => {
      const currentMonth = get().currentMonth
      console.log(data)
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
    addActivity: ({activity, day}: {activity: Activity; day: number}) => {
      set((state) => {
        const newDayData = {
          ...state.dayData,
          activities: [...state.dayData!.activities, activity],
        }
        let newMonthData = [...state.monthData]
        newMonthData[day] = newDayData
        get().actions.setMonthData(newMonthData)
        return {dayData: newDayData, monthData: newMonthData}
      })
    },
    removeActivity: ({activity, day}: {activity: string; day: number}) => {
      set((state) => {
        const newDayData = {
          ...state.dayData,
          activities: state.dayData.activities.filter((item) => item.name !== activity),
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
  },
}))

export const useStoreMainActions = () => useStoreMain((state) => state.actions)
