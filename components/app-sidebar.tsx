"use client";

import { Plus, FileText, Trash2, Edit2, MoreHorizontal } from "lucide-react";
import type { Board } from "@/types/board";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BoardModal } from "@/components/board-modal";
import { ConfirmDialog } from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface AppSidebarProps {
  boards: Board[];
  activeBoard: Board | null;
  onSelectBoard: (board: Board) => void;
  onCreateBoard: (name: string) => void;
  onEditBoard: (boardId: string, newName: string) => void;
  onDeleteBoard: (boardId: string) => void;
}

export function AppSidebar({
  boards,
  activeBoard,
  onSelectBoard,
  onCreateBoard,
  onEditBoard,
  onDeleteBoard,
}: AppSidebarProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [deletingBoard, setDeletingBoard] = useState<Board | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleCreateBoard = (name: string) => {
    onCreateBoard(name);
  };

  const handleEditBoard = (name: string) => {
    if (editingBoard) {
      onEditBoard(editingBoard.id, name);
      setEditingBoard(null);
    }
  };

  const handleDeleteBoard = () => {
    if (deletingBoard) {
      onDeleteBoard(deletingBoard.id);
      setDeletingBoard(null);
    }
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              Markdown Editor
            </h2>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              size="sm"
              className="h-8 w-8 p-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8"
              title="Add new board"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add new board</span>
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {boards.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-sm group-data-[collapsible=icon]:hidden">
                    No boards yet. Create your first board!
                  </div>
                ) : (
                  boards.map((board) => (
                    <SidebarMenuItem key={board.id}>
                      <SidebarMenuButton
                        onClick={() => onSelectBoard(board)}
                        isActive={activeBoard?.id === board.id}
                        className="flex items-start gap-2 p-2"
                        tooltip={board.title || "Untitled"}
                      >
                        <>
                          <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                            <div className="font-medium truncate">
                              {board.title || "Untitled"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(board.updatedAt)}
                            </div>
                            {board.isShared && (
                              <div className="text-xs text-blue-600 font-medium">
                                Shared Board
                              </div>
                            )}
                          </div>
                        </>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction className="group-data-[collapsible=icon]:hidden">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Board options</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          className="w-48"
                        >
                          <DropdownMenuItem
                            onClick={() => setEditingBoard(board)}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeletingBoard(board)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Create Board Modal */}
      <BoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreateBoard}
        title="Create New Board"
        description="Enter a name for your new markdown board."
        confirmText="Create Board"
      />

      {/* Edit Board Modal */}
      <BoardModal
        isOpen={!!editingBoard}
        onClose={() => setEditingBoard(null)}
        onConfirm={handleEditBoard}
        title="Rename Board"
        description="Enter a new name for this board."
        initialValue={editingBoard?.title || ""}
        confirmText="Save Changes"
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingBoard}
        onClose={() => setDeletingBoard(null)}
        onConfirm={handleDeleteBoard}
        title="Delete Board"
        description={`Are you sure you want to delete "${
          deletingBoard?.title || "this board"
        }"? This action cannot be undone.`}
        confirmText="Delete Board"
        variant="destructive"
      />
    </>
  );
}
