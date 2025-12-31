import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrmSidebar } from "@/components/CrmSidebar";
import { ArrowLeft, Trash2, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function CrmAdmin() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <CrmSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Link href="/admin/dashboard/crm">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Controls</h1>
            <p className="text-muted-foreground mb-8">Manage system-wide CRM administration settings</p>

            <div className="space-y-4">
              <Card className="p-6 border-l-4 border-l-blue-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Database Management</h3>
                    <p className="text-muted-foreground">Backup and manage CRM database</p>
                  </div>
                  <Button variant="outline" size="sm" data-testid="button-db-backup">
                    Backup
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">User Management</h3>
                    <p className="text-muted-foreground">Add and manage admin users</p>
                  </div>
                  <Button variant="outline" size="sm" data-testid="button-user-manage">
                    Manage
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-orange-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Activity Logs</h3>
                    <p className="text-muted-foreground">View system activity and user actions</p>
                  </div>
                  <Button variant="outline" size="sm" data-testid="button-view-logs">
                    View
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-red-500">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <h3 className="text-lg font-bold text-foreground">Danger Zone</h3>
                    </div>
                    <p className="text-muted-foreground">Irreversible actions - use with caution</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    data-testid="button-clear-data"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All Data
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
