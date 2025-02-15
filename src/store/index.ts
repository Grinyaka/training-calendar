import {create} from 'zustand'
import {DateData} from '../models/DateData'
import {Activity} from '../models/Activity'
import {JsonObject} from '../utils/JsonObject'

const LOCAL_STORAGE_NAME = '{month}_monthData'

interface MainData {
  monthData: DateData[]
  currentMonth: number

  actions: {
    setMonthData: (data: DateData[]) => void
    getMothData: () => DateData[]
    addActivity: ({activity, day}: {activity: Activity; day: number}) => void
    addNotes: ({day, notes}: {day: number; notes: string}) => void
  }
}

export const useMainStore = create<MainData>()((set, get) => ({
  monthData: [],
  currentMonth: new Date().getMonth(),
  actions: {
    getMothData: (): DateData[] => {
      const currentMonth = get().currentMonth
      const data = localStorage.getItem(
        `${LOCAL_STORAGE_NAME.replace('{month}', currentMonth.toString())}`,
      )
      if (!data) return []
      const json: Map<number, JsonObject<DateData>[]> = new Map(JSON.parse(data))
      const result = json.get(currentMonth)
      if (!result) return []
      set({monthData: result.map(DateData.valueOfJson)})
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
        notes: notes.split('\n').join('\\n'),
      }
      get().actions.setMonthData(currentMonthData)
    },
  },
}))

export const useMainStoreActions = () => useMainStore((state) => state.actions)
