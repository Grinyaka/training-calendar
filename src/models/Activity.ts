export type ActivityType = 'cardio' | 'strength' | 'stretch'
export type BodyPart = 'arms' | 'core' | 'legs'

export interface Activity {
  name: string
  amount: number
  goal: number
  type: ActivityType
  bodyPart: BodyPart
}
