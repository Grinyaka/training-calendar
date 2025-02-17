import { JsonObject } from '../utils/JsonObject'
import { Activity } from './Activity'

export class DateData {
  public static valueOfJson(data?: JsonObject<DateData>) {
    if (!data) return
    return new DateData(
      data.day,
      data.activities?.map(Activity.valueOfJson) || [],
      data.from,
      data.to,
      data.notes,
    )
  }

  readonly day: number
  readonly activities: Activity[]
  readonly from?: string
  readonly to?: string
  readonly notes?: string

  public constructor(
    day: number,
    activities: Activity[],
    from?: string,
    to?: string,
    notes?: string,
  ) {
    this.day = day
    this.activities = activities
    this.from = from
    this.to = to
    this.notes = notes
  }
}
