export interface Board {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  isShared?: boolean
}

export interface SharedBoard {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}
