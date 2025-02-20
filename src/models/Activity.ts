import { JsonObject } from '../utils/JsonObject'

export interface ActivityInterface {
  id: number
  name: string
  note?: string
  from?: string
  to?: string
}

export class Activity implements ActivityInterface {
  public static valueOfJson(data: JsonObject<Activity>) {
    return new Activity(data.id, data.name, data.note, data.from, data.to)
  }

  readonly id: number
  readonly name: string
  readonly note?: string
  readonly from?: string
  readonly to?: string

  public constructor(
    id: number,
    name: string,
    note?: string,
    from?: string,
    to?: string,
  ) {
    this.id = id
    this.name = name
    this.note = note
    this.from = from
    this.to = to
  }
}
