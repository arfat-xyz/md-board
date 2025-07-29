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
import { Copy, Check, ExternalLink } from "lucide-react"
import { generateShareableUrl, copyToClipboard } from "@/lib/sharing"
import type { Board } from "@/types/board"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  board: Board
}

export function ShareModal({ isOpen, onClose, board }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = generateShareableUrl(board)

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Board</DialogTitle>
          <DialogDescription>
            Share "{board.title}" with others. They can view and edit it in their own browser without affecting your
            copy.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="share-url">Shareable Link</Label>
            <div className="flex gap-2">
              <Input id="share-url" value={shareUrl} readOnly className="flex-1 font-mono text-sm" />
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
          </div>
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            <p className="font-medium mb-1">How sharing works:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Others can view and edit the shared board</li>
              <li>Changes are saved to their local browser only</li>
              <li>Your original board remains unchanged</li>
              <li>No account or login required</li>
            </ul>
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
            Preview
          </Button>
          <Button type="button" onClick={onClose} className="w-full sm:w-auto">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
