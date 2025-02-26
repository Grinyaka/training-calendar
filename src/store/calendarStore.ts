import moment from 'moment'
import { create } from 'zustand'
import { DayData } from '../models/DayData'
import { JsonObject } from '../utils/JsonObject'

const LOCAL_STORAGE_DATA = 'mainData'

interface StoreData {
  data: Map<string, DayData>
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

export const useStoreMonth = create<StoreData>()((set, get) => ({
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
        const filteredMap = result.reduce<[string, DayData][]>((filtered, item) => {
          if (item.separatedDate.month === currentMonth) {
            filtered.push([item.date, item])
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

export const useStoreActionsMonth = () => useStoreMonth((state) => state.actions)
