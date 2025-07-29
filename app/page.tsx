"use client"

import { useState, useEffect } from "react"
import type { Board } from "@/types/board"
import { getBoards, saveBoards, createBoard } from "@/lib/storage"
import { AppSidebar } from "@/components/app-sidebar"
import { MarkdownEditor } from "@/components/markdown-editor"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([])
  const [activeBoard, setActiveBoard] = useState<Board | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load boards from localStorage on mount
  useEffect(() => {
    const loadedBoards = getBoards()
    setBoards(loadedBoards)

    // Set the first board as active if available
    if (loadedBoards.length > 0) {
      setActiveBoard(loadedBoards[0])
    }

    setIsLoaded(true)
  }, [])

  // Save boards to localStorage whenever boards change
  useEffect(() => {
    if (isLoaded) {
      saveBoards(boards)
    }
  }, [boards, isLoaded])

  const handleCreateBoard = (name: string) => {
    const newBoard = createBoard(name)
    const updatedBoards = [newBoard, ...boards]
    setBoards(updatedBoards)
    setActiveBoard(newBoard)
  }

  const handleSelectBoard = (board: Board) => {
    setActiveBoard(board)
  }

  const handleDeleteBoard = (boardId: string) => {
    const updatedBoards = boards.filter((board) => board.id !== boardId)
    setBoards(updatedBoards)

    // If the deleted board was active, select another one
    if (activeBoard?.id === boardId) {
      setActiveBoard(updatedBoards.length > 0 ? updatedBoards[0] : null)
    }
  }

  const handleSaveBoard = (updatedBoard: Board) => {
    const updatedBoards = boards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board))
    setBoards(updatedBoards)
    setActiveBoard(updatedBoard)
  }

  const handleEditBoard = (boardId: string, newName: string) => {
    const updatedBoards = boards.map((board) =>
      board.id === boardId ? { ...board, title: newName, updatedAt: new Date() } : board,
    )
    setBoards(updatedBoards)

    // Update active board if it's the one being edited
    if (activeBoard?.id === boardId) {
      setActiveBoard({ ...activeBoard, title: newName, updatedAt: new Date() })
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your boards...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar
        boards={boards}
        activeBoard={activeBoard}
        onSelectBoard={handleSelectBoard}
        onCreateBoard={handleCreateBoard}
        onEditBoard={handleEditBoard}
        onDeleteBoard={handleDeleteBoard}
      />
      <SidebarInset>
        <header className="flex h-14 md:h-16 shrink-0 items-center gap-2 border-b px-3 md:px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h1 className="font-semibold text-sm md:text-base">Markdown Editor</h1>
            {activeBoard && (
              <>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <span className="text-muted-foreground text-xs md:text-sm truncate">
                  {activeBoard.title || "Untitled"}
                </span>
              </>
            )}
          </div>
        </header>
        <MarkdownEditor board={activeBoard} onSave={handleSaveBoard} />
      </SidebarInset>
    </SidebarProvider>
  )
}
