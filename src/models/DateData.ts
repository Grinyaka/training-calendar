import { Activity } from './Activity'

export interface DateData {
  dateString: string
  activities: Activity[]
  from?: string
  to?: string
  notes?: string
}
