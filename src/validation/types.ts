export enum Role {
  USER,
  ASSISTANT,
}

export type Message = {
  role: Role
  content: string
}
