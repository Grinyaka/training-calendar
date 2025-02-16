import { JsonObject } from '../utils/JsonObject'

export type ActivityType = 'cardio' | 'strength' | 'stretch'
export type BodyPart = 'arms' | 'core' | 'legs'

export interface ActivityInterface {
  name: string
  amount?: number
  goal?: number
  type?: ActivityType
  bodyPart?: BodyPart
}

export class Activity implements ActivityInterface {
  public static valueOfJson(data: JsonObject<Activity>) {
    return new Activity(data.name, data.amount, data.goal, data.type, data.bodyPart)
  }

  readonly name: string
  readonly amount: number
  readonly goal: number
  readonly type: ActivityType
  readonly bodyPart: BodyPart

  public constructor(
    name: string,
    amount?: number,
    goal?: number,
    type?: ActivityType,
    bodyPart?: BodyPart,
  ) {
    this.name = name
    this.amount = amount
    this.goal = goal
    this.type = type
    this.bodyPart = bodyPart
  }
}
