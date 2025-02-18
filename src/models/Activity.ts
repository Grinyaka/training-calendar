import { JsonObject } from '../utils/JsonObject'

export type ActivityType = 'cardio' | 'strength' | 'stretch'
export type BodyPart = 'arms' | 'core' | 'legs'

export interface ActivityInterface {
  id: number
  name: string
  note?: string
  type?: ActivityType
  bodyPart?: BodyPart
}

export class Activity implements ActivityInterface {
  public static valueOfJson(data: JsonObject<Activity>) {
    return new Activity(data.id, data.name, data.note, data.type, data.bodyPart)
  }

  readonly id: number
  readonly name: string
  readonly note?: string
  readonly type: ActivityType
  readonly bodyPart: BodyPart

  public constructor(
    id: number,
    name: string,
    note?: string,
    type?: ActivityType,
    bodyPart?: BodyPart,
  ) {
    this.id = id
    this.name = name
    this.note = note
    this.type = type
    this.bodyPart = bodyPart
  }
}
