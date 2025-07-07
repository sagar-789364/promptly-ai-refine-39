
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Check, X, Settings, ArrowLeft, Eye, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New prompt template available",
      message: "A new template for marketing copy has been added to your library.",
      time: "2 hours ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Usage limit reminder",
      message: "You've used 85% of your monthly API quota.",
      time: "1 day ago",
      type: "warning",
      read: false,
    },
    {
      id: 3,
      title: "Account security update",
      message: "Your password was successfully changed.",
      time: "3 days ago",
      type: "success",
      read: true,
    },
  ]);

  const { toast } = useToast();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "success": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Success",
      description: "All notifications marked as read",
    });
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Deleted",
      description: "Notification removed",
    });
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    toast({
      title: "Marked as read",
      description: "Notification marked as read",
    });
  };

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} showSidebarToggle />
      
      <div className="flex flex-1">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out scrollbar-thin",
            isSidebarCollapsed ? "ml-14" : "ml-[10vw] min-[200px]:ml-[200px]"
          )}
        >
          <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-jakarta">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Notifications</span>
                </h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
                <Link to="/settings/notifications">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={cn(
                  "shadow-card border-border transition-all duration-200 hover:shadow-glow-subtle",
                  !notification.read ? 'bg-gradient-to-r from-card via-card to-primary/5 border-l-4 border-l-primary shadow-glow' : 'bg-muted/20 border border-border/50'
                )}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" className="p-0 h-auto font-jakarta text-left hover:bg-transparent">
                              <CardTitle className="text-lg font-jakarta hover:text-primary transition-colors cursor-pointer">
                                {notification.title}
                              </CardTitle>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                {notification.title}
                                <Badge className={getTypeColor(notification.type)}>
                                  {notification.type}
                                </Badge>
                              </DialogTitle>
                              <DialogDescription className="text-left pt-4">
                                <div className="space-y-4">
                                  <p className="text-base">{notification.message}</p>
                                  <div className="flex items-center justify-between pt-4 border-t">
                                    <span className="text-sm text-muted-foreground">{notification.time}</span>
                                    <div className="flex gap-2">
                                      {!notification.read && (
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleMarkAsRead(notification.id)}
                                        >
                                          <Eye className="h-4 w-4 mr-2" />
                                          Mark as Read
                                        </Button>
                                      )}
                                      <Button 
                                        size="sm" 
                                        variant="destructive"
                                        onClick={() => handleDeleteNotification(notification.id)}
                                      >
                                        <Trash className="h-4 w-4 mr-2" />
                                        Delete
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <Badge className={cn(getTypeColor(notification.type), "shadow-sm")}>
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow"></div>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2 line-clamp-2">{notification.message}</p>
                    <p className="text-sm text-muted-foreground/70 flex items-center gap-2">
                      <Bell className="h-3 w-3" />
                      {notification.time}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
