"use client";

import { Heart, Github, Twitter, Globe, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Left side - Creator info */}
          <div className="flex flex-col space-y-2 md:space-y-1">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-muted-foreground">by</span>
              <span className="font-semibold text-foreground">
                <Link href={`https://www.arfat.app/`}>Arfatur Rahman</Link>
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              © {currentYear} Markdown Editor. All rights reserved.
            </div>
          </div>

          {/* Center - Tech stack */}
          <div className="hidden md:flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Built with</span>
            <div className="flex items-center space-x-1">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                Next.js
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">
                Tailwind
              </span>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() =>
                window.open("https://github.com/arfat-xyz", "_blank")
              }
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => window.open("https://x.com/arfatapp", "_blank")}
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() =>
                window.open("https://github.com/arfat-xyz/md-board", "_blank")
              }
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">Website</span>
            </Button>
            <Separator orientation="vertical" className="h-4" />
          </div>
        </div>

        {/* Mobile tech stack */}
        <div className="md:hidden mt-4 pt-4 border-t">
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <span>Built with</span>
            <div className="flex items-center space-x-1">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                Next.js
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded">
                Tailwind
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
