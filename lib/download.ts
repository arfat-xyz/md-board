import type { Board } from "@/types/board"

// Simple markdown to HTML converter for PDF
const markdownToHtml = (markdown: string): string => {
  return (
    markdown
      // Headers
      .replace(/^### (.*$)/gim, "<h3 style='margin: 16px 0 8px 0; font-size: 18px; font-weight: 600;'>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2 style='margin: 20px 0 12px 0; font-size: 24px; font-weight: 600;'>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1 style='margin: 24px 0 16px 0; font-size: 32px; font-weight: 700;'>$1</h1>")
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Code blocks
      .replace(
        /```([\s\S]*?)```/gim,
        "<pre style='background: #f5f5f5; padding: 12px; border-radius: 4px; margin: 12px 0; overflow-x: auto; font-family: monospace;'><code>$1</code></pre>",
      )
      // Inline code
      .replace(
        /`(.*?)`/gim,
        "<code style='background: #f5f5f5; padding: 2px 4px; border-radius: 2px; font-family: monospace;'>$1</code>",
      )
      // Links
      .replace(/\[([^\]]+)\]$$([^)]+)$$/gim, '<a href="$2" style="color: #0066cc; text-decoration: underline;">$1</a>')
      // Lists
      .replace(/^\* (.*$)/gim, "<li style='margin: 4px 0;'>$1</li>")
      .replace(/^- (.*$)/gim, "<li style='margin: 4px 0;'>$1</li>")
      // Wrap lists
      .replace(/(<li.*<\/li>)/gims, "<ul style='margin: 12px 0; padding-left: 24px;'>$1</ul>")
      // Line breaks
      .replace(/\n\n/gim, "</p><p style='margin: 12px 0;'>")
      .replace(/\n/gim, "<br>")
  )
}

// Download as Markdown file
export const downloadAsMarkdown = (board: Board): void => {
  const content = `# ${board.title}\n\n${board.content}`
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `${board.title || "Untitled"}.md`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Download as PDF
export const downloadAsPdf = async (board: Board): Promise<void> => {
  try {
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${board.title || "Untitled"}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            h1, h2, h3 { color: #2c3e50; }
            pre { background: #f8f9fa; border: 1px solid #e9ecef; }
            code { background: #f8f9fa; }
            blockquote {
              border-left: 4px solid #007acc;
              margin: 16px 0;
              padding-left: 16px;
              color: #666;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 16px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1 style="border-bottom: 2px solid #eee; padding-bottom: 16px;">${board.title || "Untitled"}</h1>
          <div style="margin-bottom: 24px; color: #666; font-size: 14px;">
            Created: ${board.createdAt.toLocaleDateString()}<br>
            Last updated: ${board.updatedAt.toLocaleDateString()}
          </div>
          <div>${markdownToHtml(board.content)}</div>
        </body>
      </html>
    `

    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      throw new Error("Unable to open print window")
    }

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }
  } catch (error) {
    console.error("Error generating PDF:", error)
    // Fallback: download as HTML
    const htmlContent = markdownToHtml(board.content)
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${board.title || "Untitled"}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

// Get file size estimate
export const getFileSizeEstimate = (content: string): string => {
  const bytes = new Blob([content]).size
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
