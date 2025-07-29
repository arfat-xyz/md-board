"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Board } from "@/types/board"
import { decodeBoardFromUrl } from "@/lib/sharing"
import { getBoards, saveBoards } from "@/lib/storage"
import { MarkdownEditor } from "@/components/markdown-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Download, Share2, Edit3, Eye } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EnhancedShareModal } from "@/components/enhanced-share-modal"
import { downloadAsMarkdown, downloadAsPdf } from "@/lib/download"

export default function SharedBoardPage() {
  const params = useParams()
  const router = useRouter()
  const [board, setBoard] = useState<Board | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const encodedData = params.data as string
    if (!encodedData) {
      setError("Invalid share link")
      setIsLoading(false)
      return
    }

    const decodedBoard = decodeBoardFromUrl(encodedData)
    if (!decodedBoard) {
      setError("Unable to load shared board")
      setIsLoading(false)
      return
    }

    setBoard(decodedBoard)
    setIsLoading(false)
  }, [params.data])

  const handleSaveBoard = (updatedBoard: Board) => {
    setBoard(updatedBoard)

    // Save to user's local storage
    const existingBoards = getBoards()
    const existingIndex = existingBoards.findIndex((b) => b.id === updatedBoard.id)

    let updatedBoards: Board[]
    if (existingIndex >= 0) {
      // Update existing board
      updatedBoards = existingBoards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b))
    } else {
      // Add as new board
      updatedBoards = [updatedBoard, ...existingBoards]
    }

    saveBoards(updatedBoards)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleSaveToMyBoards = () => {
    if (!board) return

    const existingBoards = getBoards()
    const boardExists = existingBoards.some((b) => b.id === board.id)

    if (!boardExists) {
      const newBoard = { ...board, isShared: true }
      const updatedBoards = [newBoard, ...existingBoards]
      saveBoards(updatedBoards)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  const handleGoToApp = () => {
    router.push("/")
  }

  const handleQuickDownload = async (format: "markdown" | "pdf") => {
    if (!board) return

    setIsDownloading(true)
    try {
      if (format === "markdown") {
        downloadAsMarkdown(board)
      } else {
        await downloadAsPdf(board)
      }
    } catch (error) {
      console.error(`Error downloading ${format}:`, error)
    } finally {
      setTimeout(() => setIsDownloading(false), 1000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading shared board...</p>
        </div>
      </div>
    )
  }

  if (error || !board) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Unable to Load Board</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The shared board link appears to be invalid or corrupted."}
          </p>
          <Button onClick={handleGoToApp}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go to App
          </Button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleGoToApp}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to App</span>
              </Button>
              <div>
                <h1 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
                  {board.title || "Untitled"}
                </h1>
                <p className="text-xs text-muted-foreground">Shared Board</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isSaved && <span className="text-sm text-green-600 font-medium hidden sm:inline">Saved!</span>}

              {/* Download Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isDownloading}
                    className="hidden sm:flex bg-transparent"
                  >
                    {isDownloading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleQuickDownload("markdown")}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Markdown (.md)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleQuickDownload("pdf")}>
                    <Eye className="h-4 w-4 mr-2" />
                    PDF Document
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Share Button */}
              <Button variant="outline" size="sm" onClick={() => setIsShareModalOpen(true)} className="bg-transparent">
                <Share2 className="h-4 w-4 mr-2 hidden sm:block" />
                <Share2 className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">Share</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveToMyBoards}
                className="hidden sm:flex bg-transparent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Save to My Boards
              </Button>
              <Button variant="outline" size="sm" onClick={handleSaveToMyBoards} className="sm:hidden bg-transparent">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Editor */}
        <div className="flex-1">
          <MarkdownEditor board={board} onSave={handleSaveBoard} />
        </div>

        {/* Mobile info banner */}
        <div className="sm:hidden bg-muted/50 p-3 text-center text-xs text-muted-foreground border-t">
          Changes are saved to your browser only • Original board remains unchanged
        </div>

        {/* Enhanced Share Modal */}
        {board && (
          <EnhancedShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} board={board} />
        )}
      </div>
    </SidebarProvider>
  )
}
