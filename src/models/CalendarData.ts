import moment from 'moment'
import { JsonObject } from '../utils/JsonObject'
import { ActivityCategory, ActivityPart } from './types'

export interface SimpleActivity {
  category: ActivityCategory
  bodyPart?: ActivityPart
}

export class CalendarData {
  public static valueOfJson(data: JsonObject<CalendarData>) {
    return new CalendarData(data.date, data.time, data.activities || [], data.notes)
  }

  public readonly date: string
  public readonly time: string
  public readonly activities: SimpleActivity[]
  public readonly notes: string

  public readonly separatedDate: {
    year: number
    month: number
    day: number
    weekday: string
  }

  public constructor(
    date: string,
    time: string,
    activities: SimpleActivity[],
    notes: string,
  ) {
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
