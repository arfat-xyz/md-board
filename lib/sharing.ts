import type { Board, SharedBoard } from "@/types/board"

// Encode board data to URL-safe base64
export const encodeBoardToUrl = (board: Board): string => {
  const sharedBoard: SharedBoard = {
    id: board.id,
    title: board.title,
    content: board.content,
    createdAt: board.createdAt.toISOString(),
    updatedAt: board.updatedAt.toISOString(),
  }

  const jsonString = JSON.stringify(sharedBoard)
  const base64 = btoa(encodeURIComponent(jsonString))
  return base64
}

// Decode board data from URL
export const decodeBoardFromUrl = (encodedData: string): Board | null => {
  try {
    const jsonString = decodeURIComponent(atob(encodedData))
    const sharedBoard: SharedBoard = JSON.parse(jsonString)

    return {
      id: sharedBoard.id,
      title: sharedBoard.title,
      content: sharedBoard.content,
      createdAt: new Date(sharedBoard.createdAt),
      updatedAt: new Date(sharedBoard.updatedAt),
      isShared: true,
    }
  } catch (error) {
    console.error("Error decoding shared board:", error)
    return null
  }
}

// Generate shareable URL
export const generateShareableUrl = (board: Board): string => {
  const encodedBoard = encodeBoardToUrl(board)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  return `${baseUrl}/shared/${encodedBoard}`
}

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const result = document.execCommand("copy")
      textArea.remove()
      return result
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error)
    return false
  }
}
