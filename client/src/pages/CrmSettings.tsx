import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrmSidebar } from "@/components/CrmSidebar";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CrmSettings() {
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
            <h1 className="text-4xl font-bold text-foreground mb-2">CRM Settings</h1>
            <p className="text-muted-foreground mb-8">Configure your CRM system preferences and behavior</p>

            <Card className="p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">General Settings</h2>
                <p className="text-muted-foreground">Settings configuration will be available here.</p>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-foreground mb-4">Preferences</h2>
                <p className="text-muted-foreground">User preferences and defaults will be available here.</p>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-foreground mb-4">Advanced Settings</h2>
                <p className="text-muted-foreground">Advanced configuration options will be available here.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
