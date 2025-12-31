import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Mail, 
  Quote, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  User,
  ExternalLink,
  Trash2,
  Plus
} from "lucide-react";
import { CrmSidebar } from "@/components/CrmSidebar";
import {
  type ServiceInquiry,
  type QuoteRequest,
  type ContactSubmission,
  type NewsletterSubscription,
} from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AdminData {
  serviceInquiries: ServiceInquiry[];
  quoteRequests: QuoteRequest[];
  contactSubmissions: ContactSubmission[];
  newsletterSubscriptions: NewsletterSubscription[];
}

export default function AdminDashboard(props: any) {
  const defaultTab = props.defaultTab;
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab || "overview");
  const [convertedInquiries, setConvertedInquiries] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") {
      setLocation("/admin");
    }
  }, [setLocation]);

  const { data, isLoading } = useQuery<AdminData>({
    queryKey: ["/api/admin/data"],
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: string }) => {
      await apiRequest("DELETE", `/api/admin/data/${type}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/data"] });
      toast({
        title: "Record deleted",
        description: "The record has been permanently removed.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error.message,
      });
    },
  });

  const convertToClientMutation = useMutation({
    mutationFn: async (inquiry: ServiceInquiry) => {
      await apiRequest("POST", `/api/admin/convert-inquiry-to-client`, {
        name: inquiry.name,
        email: inquiry.email,
        phone: "",
        company: "",
        serviceNeeded: inquiry.service,
        source: "Inquiry",
        inquiryId: inquiry.id,
      });
    },
    onSuccess: (_, inquiry) => {
      // Mark inquiry as converted but keep it visible
      setConvertedInquiries(prev => {
        const newSet = new Set(prev);
        newSet.add(inquiry.id);
        return newSet;
      });
      // Refresh CRM clients list
      queryClient.invalidateQueries({ queryKey: ["/api/crm/clients"] });
      toast({
        title: "Success!",
        description: "Inquiry has been converted to a CRM client. You can now delete this inquiry or keep it for reference.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: error.message || "Could not convert inquiry to client",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin");
  };

  const exportToCSV = (tab: string) => {
    let dataToExport: any[] = [];
    let filename = `dc_unovation_${tab}_${new Date().toISOString().split('T')[0]}.csv`;
    let headers: string[] = [];

    if (tab === "inquiries") {
      dataToExport = data?.serviceInquiries || [];
      headers = ["Name", "Email", "Service", "Message", "Timestamp"];
    } else if (tab === "quotes") {
      dataToExport = data?.quoteRequests || [];
      headers = ["Name", "Email", "Project Type", "Budget", "Timestamp"];
    } else if (tab === "contact") {
      dataToExport = data?.contactSubmissions || [];
      headers = ["Name", "Email", "Phone", "Message", "Timestamp"];
    } else if (tab === "newsletter") {
      dataToExport = data?.newsletterSubscriptions || [];
      headers = ["Email", "Name", "Source", "Timestamp"];
    }

    if (dataToExport.length === 0) return;

    const csvContent = [
      headers.join(","),
      ...dataToExport.map(item => {
        return headers.map(header => {
          const key = header.toLowerCase().replace(" ", "") as keyof typeof item;
          // Simple escaping for CSV
          let val = String(item[key] || "");
          if (val.includes(",") || val.includes("\"") || val.includes("\n")) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Inquiries", value: data?.serviceInquiries.length || 0, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Quote Requests", value: data?.quoteRequests.length || 0, icon: Quote, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Contact Forms", value: data?.contactSubmissions.length || 0, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Subscribers", value: data?.newsletterSubscriptions.length || 0, icon: Mail, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  const recentActivity = [
    ...(data?.serviceInquiries || []).map(i => ({ ...i, type: "Inquiry", icon: MessageSquare, color: "text-blue-500" })),
    ...(data?.quoteRequests || []).map(i => ({ ...i, type: "Quote", icon: Quote, color: "text-green-500" })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

  return (
    <div className="min-h-screen bg-muted/20 flex">
      <CrmSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-background/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between lg:justify-end">
          <div className="lg:hidden flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="font-bold">DC Unovation</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1.5 border">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium">System Online</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
          {activeTab === "overview" ? (
            <div className="space-y-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h1>
                <p className="text-muted-foreground">Here's what's happening with your digital agency today.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <Card key={idx} className="hover-elevate overflow-hidden border-none shadow-sm group">
                    <CardContent className="p-0">
                      <div className="p-6 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="px-6 pb-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-green-500 font-medium">+4%</span>
                        <span>from last week</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest interactions across all forms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.length === 0 ? (
                      <div className="h-40 flex items-center justify-center text-muted-foreground italic">No recent activity</div>
                    ) : (
                      recentActivity.map((activity: any, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/40 border border-transparent hover:border-border hover:bg-muted/60 transition-all group">
                          <div className={`p-2.5 rounded-full bg-background border ${activity.color}`}>
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-sm">{activity.name}</p>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {new Date(activity.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Submitted a <span className="font-medium text-foreground">{activity.type}</span> request</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
                        </div>
                      ))
                    )}
                    {recentActivity.length > 0 && (
                      <Button variant="ghost" className="w-full mt-2 text-xs h-8" onClick={() => setActiveTab("inquiries")}>
                        View all activity
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3 border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-3">
                    <Button variant="outline" className="justify-start gap-3 h-12">
                      <ExternalLink className="h-4 w-4" /> View Live Site
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 h-12">
                      <User className="h-4 w-4" /> Update Admin Profile
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 h-12">
                      <Mail className="h-4 w-4" /> Export Subscribers
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight capitalize">{activeTab} Details</h2>
                <p className="text-muted-foreground">Full data breakdown for your {activeTab}.</p>
              </div>

              <Card className="border-none shadow-sm overflow-hidden bg-background">
                <CardHeader className="border-b px-6 py-4 flex flex-row items-center justify-between bg-muted/10">
                  <div className="space-y-0.5">
                    <CardTitle className="text-lg">Detailed Report</CardTitle>
                    <CardDescription>Historical data view</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="h-8" onClick={() => exportToCSV(activeTab)}>Export to CSV</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    {activeTab === "inquiries" && (
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="w-[180px] px-6">Client Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Selected Service</TableHead>
                            <TableHead className="max-w-[250px]">Message</TableHead>
                            <TableHead className="text-right px-6">Date</TableHead>
                            <TableHead className="w-[120px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.serviceInquiries.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/20 border-b">
                              <TableCell className="font-medium px-6">{item.name}</TableCell>
                              <TableCell>{item.email}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
                                  {item.service}
                                </span>
                              </TableCell>
                              <TableCell className="max-w-[250px] truncate py-4" title={item.message}>{item.message}</TableCell>
                              <TableCell className="text-right text-muted-foreground px-6">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                              <TableCell className="px-6 flex items-center gap-1">
                                <Button
                                  variant={convertedInquiries.has(item.id) ? "secondary" : "outline"}
                                  size="sm"
                                  className="h-8 text-xs"
                                  onClick={() => convertToClientMutation.mutate(item)}
                                  disabled={convertToClientMutation.isPending || convertedInquiries.has(item.id)}
                                  data-testid="button-convert-inquiry"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  {convertedInquiries.has(item.id) ? "✓ Converted" : "Add CRM"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => deleteMutation.mutate({ type: "inquiries", id: item.id })}
                                  disabled={deleteMutation.isPending}
                                  data-testid="button-delete-inquiry"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    
                    {activeTab === "quotes" && (
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="px-6">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Project Type</TableHead>
                            <TableHead>Budget Range</TableHead>
                            <TableHead className="text-right px-6">Date</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.quoteRequests.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/20 border-b">
                              <TableCell className="font-medium px-6">{item.name}</TableCell>
                              <TableCell>{item.email}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:text-green-300">
                                  {item.projectType}
                                </span>
                              </TableCell>
                              <TableCell className="font-bold text-green-600 dark:text-green-400">{item.budget}</TableCell>
                              <TableCell className="text-right text-muted-foreground px-6">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                              <TableCell className="px-6">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => deleteMutation.mutate({ type: "quotes", id: item.id })}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}

                    {activeTab === "contact" && (
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="px-6">Sender</TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead className="max-w-[300px]">Message Preview</TableHead>
                            <TableHead className="text-right px-6">Received On</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.contactSubmissions.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/20 border-b">
                              <TableCell className="font-medium px-6">{item.name}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">{item.email}</span>
                                  <span className="text-xs text-muted-foreground">{item.phone || "No phone"}</span>
                                </div>
                              </TableCell>
                              <TableCell className="max-w-[300px] truncate py-4" title={item.message}>{item.message}</TableCell>
                              <TableCell className="text-right text-muted-foreground px-6">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                              <TableCell className="px-6">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => deleteMutation.mutate({ type: "contact", id: item.id })}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}

                    {activeTab === "newsletter" && (
                      <Table>
                        <TableHeader className="bg-muted/30">
                          <TableRow>
                            <TableHead className="px-6">Email Address</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Signup Source</TableHead>
                            <TableHead className="text-right px-6">Date Joined</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data?.newsletterSubscriptions.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/20 border-b">
                              <TableCell className="font-bold text-primary px-6">{item.email}</TableCell>
                              <TableCell>{item.name || "N/A"}</TableCell>
                              <TableCell>
                                <span className="bg-muted border rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                  {item.source}
                                </span>
                              </TableCell>
                              <TableCell className="text-right text-muted-foreground px-6">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                              <TableCell className="px-6">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => deleteMutation.mutate({ type: "newsletter", id: item.id })}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}

                    {(!data || data[activeTab as keyof AdminData]?.length === 0) && (
                      <div className="h-60 flex flex-col items-center justify-center gap-2 text-muted-foreground border-t">
                        <Loader2 className="h-6 w-6 opacity-20" />
                        <p className="text-sm font-medium italic">No records found for this category</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
