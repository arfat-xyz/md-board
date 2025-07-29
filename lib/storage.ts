import type { Board } from "@/types/board"

const STORAGE_KEY = "markdown-boards"

export const getBoards = (): Board[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const boards = JSON.parse(stored)
    return boards.map((board: any) => ({
      ...board,
      createdAt: new Date(board.createdAt),
      updatedAt: new Date(board.updatedAt),
    }))
  } catch (error) {
    console.error("Error loading boards:", error)
    return []
  }
}

export const saveBoards = (boards: Board[]): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
  } catch (error) {
    console.error("Error saving boards:", error)
  }
}

export const createBoard = (title = "Untitled"): Board => {
  return {
    id: crypto.randomUUID(),
    title,
    content: `# ${title}\n\nStart writing your markdown here...`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
