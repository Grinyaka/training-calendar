import moment from 'moment'
import { JsonObject } from '../utils/JsonObject'
import { Activity } from './Activity'

export class DayData {
  public static valueOfJson(data: JsonObject<DayData>) {
    return new DayData(
      data.date,
      data.time,
      data.activities.map(Activity.valueOfJson) || [],
      data.notes,
    )
  }

  public readonly date: string
  public readonly time: string
  public readonly activities: Activity[]
  public readonly notes: string

  public readonly separatedDate: {
    year: number
    month: number
    day: number
    weekday: string
  }

  public constructor(date: string, time: string, activities: Activity[], notes: string) {
    this.time = time
    this.activities = activities
    this.notes = notes

    const [year, month, day] = date.split('-')

    this.date = date
    this.separatedDate = {
      year: Number(year),
      month: Number(month),
      day: Number(day),
      weekday: moment(date).format('dddd'),
    }
  }
}
