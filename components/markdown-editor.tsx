"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import type { Board } from "@/types/board"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { EnhancedShareModal } from "@/components/enhanced-share-modal"
import { Eye, Edit3, Share2, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { downloadAsMarkdown, downloadAsPdf } from "@/lib/download"

interface MarkdownEditorProps {
  board: Board | null
  onSave: (board: Board) => void
}

// Simple markdown to HTML converter
const parseMarkdown = (markdown: string): string => {
  return (
    markdown
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
      // Inline code
      .replace(/`(.*?)`/gim, "<code>$1</code>")
      // Links
      .replace(/\[([^\]]+)\]$$([^)]+)$$/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Lists
      .replace(/^\* (.*$)/gim, "<li>$1</li>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      // Line breaks
      .replace(/\n\n/gim, "</p><p>")
      .replace(/\n/gim, "<br>")
  )
}

export function MarkdownEditor({ board, onSave }: MarkdownEditorProps) {
  const [content, setContent] = useState(board?.content || "")
  const [title, setTitle] = useState(board?.title || "")
  const [activeTab, setActiveTab] = useState("edit")
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Update local state when board changes
  useEffect(() => {
    if (board) {
      setContent(board.content)
      setTitle(board.title)
    }
  }, [board])

  // Debounced save function
  const debouncedSave = useCallback(() => {
    if (!board) return

    const timeoutId = setTimeout(() => {
      const updatedBoard: Board = {
        ...board,
        title: title || "Untitled",
        content,
        updatedAt: new Date(),
      }
      onSave(updatedBoard)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [board, title, content, onSave])

  // Trigger debounced save when content or title changes
  useEffect(() => {
    if (!board) return
    const cleanup = debouncedSave()
    return cleanup
  }, [content, title, debouncedSave])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
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

  if (!board) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">No board selected</h2>
          <p className="text-sm md:text-base">Select a board from the sidebar or create a new one to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 flex flex-col h-full">
        {/* Title and Actions Header */}
        <div className="border-b p-3 md:p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="text-xl md:text-2xl font-semibold bg-transparent border-none outline-none w-full"
                placeholder="Board title..."
              />
              {board.isShared && (
                <div className="text-sm text-blue-600 font-medium mt-1">
                  📤 Shared Board - Changes save to your local browser only
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Quick Download Dropdown */}
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

              {/* Mobile Download Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickDownload("markdown")}
                disabled={isDownloading}
                className="sm:hidden bg-transparent"
              >
                {isDownloading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
              </Button>

              {/* Share Button */}
              <Button variant="outline" size="sm" onClick={() => setIsShareModalOpen(true)} className="bg-transparent">
                <Share2 className="h-4 w-4 mr-2 hidden sm:block" />
                <Share2 className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Tabbed interface, Desktop: Split view */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Mobile/Tablet Tabs */}
          <div className="flex-1 lg:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b px-3 py-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit" className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="edit" className="flex-1 m-0">
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  className="w-full h-full p-3 md:p-4 resize-none border-none outline-none font-mono text-sm"
                  placeholder="Start writing your markdown here..."
                />
              </TabsContent>

              <TabsContent value="preview" className="flex-1 m-0">
                <div
                  className="p-3 md:p-4 h-full overflow-auto prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Split View */}
          <div className="hidden lg:flex flex-1">
            {/* Markdown input */}
            <div className="flex-1 border-r">
              <div className="p-4 border-b bg-muted/50">
                <h3 className="font-medium flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Markdown
                </h3>
              </div>
              <textarea
                value={content}
                onChange={handleContentChange}
                className="w-full h-full p-4 resize-none border-none outline-none font-mono text-sm"
                placeholder="Start writing your markdown here..."
              />
            </div>

            {/* Preview */}
            <div className="flex-1">
              <div className="p-4 border-b bg-muted/50">
                <h3 className="font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </h3>
              </div>
              <div
                className="p-4 h-full overflow-auto prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Share Modal */}
      <EnhancedShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} board={board} />
    </>
  )
}
