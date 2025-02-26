import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import { Activity } from '../models/Activity'
import { JsonObject } from '../utils/JsonObject'

const LOCAL_STORAGE_DATA = 'available_activities'

interface StoreData {
  data: Activity[]
  isLoading: boolean

  error?: string

  actions: {
    fetchAvailableActivities: () => void
    addAvailableActivity: (activity: Activity) => void
    removeAvailableActivity: (activity: Activity) => void
  }
}

const DEFAULT_PROPS: Omit<StoreData, 'actions'> = {
  data: [],
  isLoading: false,
  error: undefined,
}

export const useStoreActivities = create<StoreData>()((set, get) => ({
  ...DEFAULT_PROPS,
  actions: {
    fetchAvailableActivities: () => {
      set({isLoading: true})
      try {
        const response = localStorage.getItem(LOCAL_STORAGE_DATA)
        const json: JsonObject<Activity>[] = response ? JSON.parse(response) : []
        const result = json.map(Activity.valueOfJson)
        if (!result) return set({isLoading: false})
        set({data: result, isLoading: false})
      } catch (e) {
        set({error: (e as Error).message, isLoading: false})
      }
    },
    addAvailableActivity: (activity: Activity) => {
      set((state) => ({data: [...state.data, activity]}))
    },
    removeAvailableActivity: (activity: Activity) => {
      const filteredActivities = [...get().data].filter(
        (item) => !shallow(item, activity),
      )
      set({
        data: filteredActivities,
      })
    },
  },
}))

