
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Sparkles, History, FileText, Bookmark, LogOut } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [recentPrompts] = useState([
    { id: 1, title: "Marketing copy for SaaS", date: "Today" },
    { id: 2, title: "Code review prompt", date: "Yesterday" },
    { id: 3, title: "Creative writing assistant", date: "2 days ago" },
  ]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={cn(
        "fixed top-[4rem] left-0 h-[calc(100vh-4rem)] flex flex-col bg-card/50 backdrop-blur-sm border-r border-border/50 transition-all duration-300 ease-in-out shadow-ai z-40",
        isCollapsed ? "w-14" : "w-[10vw] min-w-[200px]"
      )}
    >
      {/* New Prompt button - Fixed at top */}
      <div className="flex-shrink-0 p-3 border-b border-border/30 bg-card/80 backdrop-blur-sm">
        <Link to="/workspace">
          <Button
            variant={isCollapsed ? "ghost" : "ai"}
            size={isCollapsed ? "icon" : "default"}
            className={cn(
              "w-full transition-all duration-200",
              isCollapsed 
                ? "justify-center h-10 w-10 mx-auto bg-transparent hover:bg-accent/50" 
                : "justify-start"
            )}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">New Prompt</span>}
          </Button>
        </Link>
      </div>

      {/* Scrollable content area - Custom scrollbar */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {!isCollapsed && (
          <div className="px-2 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
              Navigation
            </h3>
          </div>
        )}
        
        <div className={cn("space-y-1", isCollapsed && "flex flex-col items-center")}>
          <Link to="/workspace">
            <Button
              variant={isActive('/workspace') ? 'secondary' : 'ghost'}
              size={isCollapsed ? "icon" : "sm"}
              className={cn(
                "w-full hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-200",
                isCollapsed 
                  ? "justify-center h-10 w-10 mx-auto" 
                  : "justify-start"
              )}
            >
              <Sparkles className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Workspace</span>}
            </Button>
          </Link>

          <Link to="/history">
            <Button
              variant={isActive('/history') ? 'secondary' : 'ghost'}
              size={isCollapsed ? "icon" : "sm"}
              className={cn(
                "w-full hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-200",
                isCollapsed 
                  ? "justify-center h-10 w-10 mx-auto" 
                  : "justify-start"
              )}
            >
              <History className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">History</span>}
            </Button>
          </Link>

          <Link to="/templates">
            <Button
              variant={isActive('/templates') ? 'secondary' : 'ghost'}
              size={isCollapsed ? "icon" : "sm"}
              className={cn(
                "w-full hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-200",
                isCollapsed 
                  ? "justify-center h-10 w-10 mx-auto" 
                  : "justify-start"
              )}
            >
              <FileText className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Templates</span>}
            </Button>
          </Link>

          <Link to="/saved">
            <Button
              variant={isActive('/saved') ? 'secondary' : 'ghost'}
              size={isCollapsed ? "icon" : "sm"}
              className={cn(
                "w-full hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-200",
                isCollapsed 
                  ? "justify-center h-10 w-10 mx-auto" 
                  : "justify-start"
              )}
            >
              <Bookmark className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Saved</span>}
            </Button>
          </Link>

          <Link to="/docs">
            <Button
              variant={isActive('/docs') ? 'secondary' : 'ghost'}
              size={isCollapsed ? "icon" : "sm"}
              className={cn(
                "w-full hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-200",
                isCollapsed 
                  ? "justify-center h-10 w-10 mx-auto" 
                  : "justify-start"
              )}
            >
              <FileText className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Docs</span>}
            </Button>
          </Link>

          <Link to="/examples">
            <Button
              variant={isActive('/examples') ? 'secondary' : 'ghost'}
              size={isCollapsed ? "icon" : "sm"}
              className={cn(
                "w-full hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-200",
                isCollapsed 
                  ? "justify-center h-10 w-10 mx-auto" 
                  : "justify-start"
              )}
            >
              <FileText className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Examples</span>}
            </Button>
          </Link>
        </div>

        {/* Recent prompts */}
        {!isCollapsed && (
          <div className="pt-4">
            <div className="px-2 py-2 mb-2">
              <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
                Recent
              </h3>
            </div>
            <div className="space-y-1">
              {recentPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="group p-2 rounded-md hover:bg-accent/30 cursor-pointer transition-all duration-200 hover:shadow-glow-subtle"
                >
                  <p className="text-sm font-medium text-foreground truncate">
                    {prompt.title}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {prompt.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Logout button - Fixed at bottom */}
      <div className="flex-shrink-0 p-3 border-t border-border/30 bg-card/80 backdrop-blur-sm">
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "sm"}
          className={cn(
            "w-full hover:bg-destructive/10 hover:text-destructive transition-all duration-200",
            isCollapsed 
              ? "justify-center h-10 w-10 mx-auto" 
              : "justify-start"
          )}
          onClick={() => {
            // Handle logout logic here
            console.log("Logout clicked");
          }}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
