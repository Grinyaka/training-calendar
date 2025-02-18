import { JsonObject } from '../utils/JsonObject'

export type ActivityType = 'cardio' | 'strength' | 'stretch'
export type BodyPart = 'arms' | 'core' | 'legs'

export interface ActivityInterface {
  id: number
  name: string
  amount?: number
  goal?: number
  type?: ActivityType
  bodyPart?: BodyPart
}

export class Activity implements ActivityInterface {
  public static valueOfJson(data: JsonObject<Activity>) {
    return new Activity(data.id, data.name, data.amount, data.goal, data.type, data.bodyPart)
  }

  readonly id: number
  readonly name: string
  readonly amount: number
  readonly goal: number
  readonly type: ActivityType
  readonly bodyPart: BodyPart

  public constructor(
    id: number,
    name: string,
    amount?: number,
    goal?: number,
    type?: ActivityType,
    bodyPart?: BodyPart,
  ) {
    this.id = id
    this.name = name
    this.amount = amount
    this.goal = goal
    this.type = type
    this.bodyPart = bodyPart
  }
}
