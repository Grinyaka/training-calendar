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
    setMonthData: (data: DateData[]) => void
    getMothData: () => DateData[]
    addActivity: ({activity, day}: {activity: Activity; day: number}) => void
    addNotes: ({day, notes}: {day: number; notes: string}) => void
    setDayData: (day?: number) => void
  }
}

const DEFAULT_PROPS = {
  monthData: [],
  currentMonth: new Date().getMonth(),
  dayData: undefined,
}

export const useMainStore = create<MainData>()((set, get) => ({
  monthData: DEFAULT_PROPS.monthData,
  currentMonth: DEFAULT_PROPS.currentMonth,
  dayData: DEFAULT_PROPS.dayData,
  actions: {
    getMothData: (): DateData[] => {
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

      const result = data.map(DateData.valueOfJson)
      set({monthData: result})
      localStorage.setItem(
        `${LOCAL_STORAGE_NAME.replace('{month}', currentMonth.toString())}`,
        JSON.stringify(result),
      )
    },
    addActivity: ({activity, day}: {activity: Activity; day: number}) => {
      let currentMonthData = get().monthData
      currentMonthData[day] = {
        ...currentMonthData[day],
        activities: [...currentMonthData[day].activities, activity],
      }
      get().actions.setMonthData(currentMonthData)
    },
    addNotes: ({day, notes}: {day: number; notes: string}) => {
      let currentMonthData = get().monthData
      currentMonthData[day] = {
        ...currentMonthData[day],
        notes,
      }
      get().actions.setMonthData(currentMonthData)
    },
    setDayData: (day?: number) => {
      if (day === undefined) {
        return set({dayData: DEFAULT_PROPS.dayData})
      }
      const currentMonthData = get().monthData
      if (!currentMonthData || currentMonthData.length === 0) {
        const newData = get().actions.getMothData()
        return set({dayData: newData[day]})
      }
      set({dayData: get().monthData[day]})
    },
  },
}))

export const useMainStoreActions = () => useMainStore((state) => state.actions)
