"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, ExternalLink, Download, FileText, File } from "lucide-react"
import { generateShareableUrl, copyToClipboard } from "@/lib/sharing"
import { downloadAsMarkdown, downloadAsPdf, getFileSizeEstimate } from "@/lib/download"
import type { Board } from "@/types/board"

interface EnhancedShareModalProps {
  isOpen: boolean
  onClose: () => void
  board: Board
}

export function EnhancedShareModal({ isOpen, onClose, board }: EnhancedShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState<"pdf" | "markdown" | null>(null)

  const shareUrl = generateShareableUrl(board)
  const fileSizeEstimate = getFileSizeEstimate(board.content)

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleOpenInNewTab = () => {
    window.open(shareUrl, "_blank")
  }

  const handleDownloadMarkdown = async () => {
    setIsDownloading("markdown")
    try {
      downloadAsMarkdown(board)
    } catch (error) {
      console.error("Error downloading markdown:", error)
    } finally {
      setTimeout(() => setIsDownloading(null), 1000)
    }
  }

  const handleDownloadPdf = async () => {
    setIsDownloading("pdf")
    try {
      await downloadAsPdf(board)
    } catch (error) {
      console.error("Error downloading PDF:", error)
    } finally {
      setTimeout(() => setIsDownloading(null), 1000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Share & Export Board
          </DialogTitle>
          <DialogDescription>Share "{board.title}" with others or download it in different formats.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Share Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <Label className="text-sm font-medium">Share Link</Label>
            </div>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="flex-1 font-mono text-xs bg-muted/50" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="shrink-0 bg-transparent"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-1">📤 How sharing works:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Others can view and edit the shared board</li>
                <li>Changes are saved to their local browser only</li>
                <li>Your original board remains unchanged</li>
                <li>No account or login required</li>
              </ul>
            </div>
          </div>

          <Separator />

          {/* Download Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <Label className="text-sm font-medium">Download Options</Label>
            </div>

            <div className="grid gap-3">
              {/* Markdown Download */}
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Markdown File</p>
                    <p className="text-xs text-muted-foreground">Raw markdown format • {fileSizeEstimate}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadMarkdown}
                  disabled={isDownloading === "markdown"}
                  className="bg-transparent"
                >
                  {isDownloading === "markdown" ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* PDF Download */}
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-md">
                    <File className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">PDF Document</p>
                    <p className="text-xs text-muted-foreground">Formatted document • Print-ready</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading === "pdf"}
                  className="bg-transparent"
                >
                  {isDownloading === "pdf" ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> PDF downloads will open your browser's print dialog. Choose "Save as PDF" as the
              destination.
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleOpenInNewTab}
            className="w-full sm:w-auto bg-transparent"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview Share
          </Button>
          <Button type="button" onClick={onClose} className="w-full sm:w-auto">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
