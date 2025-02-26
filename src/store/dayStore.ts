import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import { Activity } from '../models/Activity'
import { DayData } from '../models/DayData'
import { useStoreMonth } from './calendarStore'

interface StoreData {
  isLoading: boolean
  data?: DayData
  error?: string

  currentFormValues: Partial<DayData>

  actions: {
    fetchDayData: (date: string) => void

    setTime: (time: string) => void
    setNotes: (notes: string) => void
    removeActivity: (activity: Activity) => void
    addActivity: (activity: Activity) => void
  }
}

const DEFAULT_PROPS: Omit<StoreData, 'actions'> = {
  data: undefined,
  isLoading: false,
  error: undefined,
  currentFormValues: undefined,
}

export const useStoreDay = create<StoreData>()((set, get) => ({
  ...DEFAULT_PROPS,
  actions: {
    fetchDayData: (date: string) => {
      set({isLoading: true})
      try {
        const monthData = useStoreMonth.getState().data
        if (monthData.has(date)) {
          const currentDayData = monthData.get(date)
          set({data: currentDayData, currentFormValues: currentDayData, isLoading: false})
        } else {
          const newDate: DayData = new DayData(date, '18:00-19:00', [], '')
          set({data: newDate, currentFormValues: newDate, isLoading: false})
        }
      } catch (e) {
        const newDate: DayData = new DayData(date, '18:00-19:00', [], '')
        set({
          error: (e as Error).message,
          data: newDate,
          currentFormValues: newDate,
          isLoading: false,
        })
      }
    },
    setTime: (time: string) => {
      set((state) => ({currentFormValues: {...state.currentFormValues, time}}))
    },
    setNotes: (notes: string) => {
      set((state) => ({currentFormValues: {...state.currentFormValues, notes}}))
    },
    removeActivity: (activity: Activity) => {
      const filteredActivities = [...get().currentFormValues.activities].filter(
        (item) => !shallow(item, activity),
      )
      set((state) => ({
        currentFormValues: {...state.currentFormValues, activities: filteredActivities},
      }))
    },
    addActivity: (activity: Activity) => {
      const newActivity = Activity.valueOfJson(activity)
      const newActivities = [...get().currentFormValues.activities, newActivity]
      set((state) => ({
        currentFormValues: {...state.currentFormValues, activities: newActivities},
      }))

      //
    },
  },
}))
