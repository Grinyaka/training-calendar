import {create} from 'zustand'
import {Activity} from '../models/Activity'
import {DateData} from '../models/DateData'
import {JsonObject} from '../utils/JsonObject'
import {DayData} from '../models/DayData'
import moment from 'moment'

const LOCAL_STORAGE_DATA = 'mainData'
const LOCAL_STORAGE_ACTIVITIES = 'availableActivities'

interface StoreData {
  data: Map<number, DayData>
  totalDays: number
  currentMonth: number
  isLoading: boolean

  error?: string

  actions: {
    fetchMonthData: () => void
    changeMonth: (month: number) => void
  }
}

const DEFAULT_PROPS: Omit<StoreData, 'actions'> = {
  data: new Map(),
  totalDays: moment().daysInMonth(),
  currentMonth: new Date().getMonth() + 1,
  isLoading: false,
  error: undefined,
}

export const useStoreMain = create<StoreData>()((set, get) => ({
  ...DEFAULT_PROPS,
  actions: {
    fetchMonthData: () => {
      set({isLoading: true})
      try {
        const response = localStorage.getItem(LOCAL_STORAGE_DATA)
        const json: JsonObject<DayData>[] = response ? JSON.parse(response) : []
        const result = json.map(DayData.valueOfJson)
        if (!result) return set({isLoading: false})
        const currentMonth = get().currentMonth
        const filteredMap = result.reduce<[number, DayData][]>((filtered, item) => {
          if (item.separatedDate.month === currentMonth) {
            filtered.push([item.separatedDate.day, item])
          }
          return filtered
        }, [])
        set({data: new Map(filteredMap), isLoading: false})
      } catch (e) {
        set({error: (e as Error).message, isLoading: false})
      }
    },
    changeMonth: (month: number) => {
      set({currentMonth: month})
    },
  },
}))

export const useStoreActionsMain = () => useStoreMain((state) => state.actions)
