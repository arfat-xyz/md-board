import type { Board } from "@/types/board";

// Simple markdown to HTML converter for PDF
const markdownToHtml = (markdown: string): string => {
  return (
    markdown
      // Headers
      .replace(
        /^### (.*$)/gim,
        "<h3 style='margin: 16px 0 8px 0; font-size: 18px; font-weight: 600;'>$1</h3>"
      )
      .replace(
        /^## (.*$)/gim,
        "<h2 style='margin: 20px 0 12px 0; font-size: 24px; font-weight: 600;'>$1</h2>"
      )
      .replace(
        /^# (.*$)/gim,
        "<h1 style='margin: 24px 0 16px 0; font-size: 32px; font-weight: 700;'>$1</h1>"
      )
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Code blocks
      .replace(
        /```([\s\S]*?)```/gim,
        "<pre style='background: #f5f5f5; padding: 12px; border-radius: 4px; margin: 12px 0; overflow-x: auto; font-family: monospace;'><code>$1</code></pre>"
      )
      // Inline code
      .replace(
        /`(.*?)`/gim,
        "<code style='background: #f5f5f5; padding: 2px 4px; border-radius: 2px; font-family: monospace;'>$1</code>"
      )
      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/gim,
        '<a href="$2" style="color: #0066cc; text-decoration: underline;">$1</a>'
      )
      // Lists
      .replace(/^\* (.*$)/gim, "<li style='margin: 4px 0;'>$1</li>")
      .replace(/^- (.*$)/gim, "<li style='margin: 4px 0;'>$1</li>")
      // Wrap lists
      .replace(
        /(<li.*<\/li>)/gims,
        "<ul style='margin: 12px 0; padding-left: 24px;'>$1</ul>"
      )
      // Line breaks
      .replace(/\n\n/gim, "</p><p style='margin: 12px 0;'>")
      .replace(/\n/gim, "<br>")
  );
};

// Download as Markdown file
export const downloadAsMarkdown = (board: Board): void => {
  const content = `# ${board.title}\n\n${board.content}`;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${board.title || "Untitled"}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Download as PDF
// Download as PDF with direct download
export const downloadAsPdf = async (board: Board): Promise<void> => {
  try {
    // Import jsPDF dynamically
    const { jsPDF } = await import("jspdf");

    // Create a new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: board.title || "Untitled",
      creator: "Your App Name",
    });

    // Add title
    doc.setFontSize(20);
    doc.text(board.title || "Untitled", 14, 20);

    // Add metadata
    doc.setFontSize(10);
    doc.text(`Created: ${board.createdAt.toLocaleDateString()}`, 14, 30);
    doc.text(`Last updated: ${board.updatedAt.toLocaleDateString()}`, 14, 36);

    // Add content (simplified - for better formatting you might need html2canvas or similar)
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(board.content, 180);
    doc.text(lines, 14, 46);

    // Save the PDF
    doc.save(`${board.title || "Untitled"}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Fallback to HTML download as before
    const htmlContent = markdownToHtml(board.content);
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${sanitizeFilename(board.title || "Untitled")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
const sanitizeFilename = (name: string): string => {
  return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};
// Get file size estimate
export const getFileSizeEstimate = (content: string): string => {
  const bytes = new Blob([content]).size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
