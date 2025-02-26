import { JsonObject } from '../utils/JsonObject'
import { ActivityCategory, ActivityPart } from './types'

export class Activity {
  static valueOfJson(data: JsonObject<Activity>): Activity {
    return new Activity(data.name, data.category, data.bodyPart)
  } 

  readonly name: string
  readonly category: ActivityCategory
  readonly bodyPart?: ActivityPart

  constructor(name: string, category: ActivityCategory, bodyPart?: ActivityPart) {
    this.name = name
    this.category = category
    this.bodyPart = bodyPart
  }
}
