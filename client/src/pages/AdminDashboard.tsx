import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
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
import { Loader2, LayoutDashboard, MessageSquare, FileText, Mail, Quote, LogOut } from "lucide-react";
import {
  type ServiceInquiry,
  type QuoteRequest,
  type ContactSubmission,
  type NewsletterSubscription,
} from "@shared/schema";

interface AdminData {
  serviceInquiries: ServiceInquiry[];
  quoteRequests: QuoteRequest[];
  contactSubmissions: ContactSubmission[];
  newsletterSubscriptions: NewsletterSubscription[];
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") {
      setLocation("/admin");
    }
  }, [setLocation]);

  const { data, isLoading } = useQuery<AdminData>({
    queryKey: ["/api/admin/data"],
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    { label: "Total Inquiries", value: data?.serviceInquiries.length || 0, icon: MessageSquare, color: "text-blue-500" },
    { label: "Quote Requests", value: data?.quoteRequests.length || 0, icon: Quote, color: "text-green-500" },
    { label: "Contact Forms", value: data?.contactSubmissions.length || 0, icon: FileText, color: "text-purple-500" },
    { label: "Subscribers", value: data?.newsletterSubscriptions.length || 0, icon: Mail, color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-md p-1.5">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">Admin Console</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="hover-elevate">
              <CardContent className="pt-6 flex items-center gap-4">
                <div className={`p-3 rounded-full bg-background border ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="inquiries" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-background border h-11 p-1">
              <TabsTrigger value="inquiries" className="data-[state=active]:bg-muted">Inquiries</TabsTrigger>
              <TabsTrigger value="quotes" className="data-[state=active]:bg-muted">Quotes</TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-muted">Contact</TabsTrigger>
              <TabsTrigger value="newsletter" className="data-[state=active]:bg-muted">Subscribers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="inquiries" className="mt-0">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-background border-b px-6 py-4">
                <CardTitle className="text-lg">Service Inquiries</CardTitle>
                <CardDescription>Direct requests for specific digital services.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[180px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead className="max-w-[300px]">Message</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.serviceInquiries.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">No inquiries found yet.</TableCell>
                        </TableRow>
                      ) : (
                        data?.serviceInquiries.map((item) => (
                          <TableRow key={item.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                                {item.service}
                              </span>
                            </TableCell>
                            <TableCell className="max-w-[300px] truncate" title={item.message}>{item.message}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes" className="mt-0">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-background border-b px-6 py-4">
                <CardTitle className="text-lg">Quote Requests</CardTitle>
                <CardDescription>Prospective clients looking for project estimates.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[180px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Project Type</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.quoteRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">No quote requests found.</TableCell>
                        </TableRow>
                      ) : (
                        data?.quoteRequests.map((item) => (
                          <TableRow key={item.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                                {item.projectType}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium text-green-600 dark:text-green-400">{item.budget}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-background border-b px-6 py-4">
                <CardTitle className="text-lg">General Inquiries</CardTitle>
                <CardDescription>Messages from the main contact form.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[180px]">Name</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead className="max-w-[300px]">Message</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.contactSubmissions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">No messages yet.</TableCell>
                        </TableRow>
                      ) : (
                        data?.contactSubmissions.map((item) => (
                          <TableRow key={item.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>
                              <div className="flex flex-col text-sm">
                                <span>{item.email}</span>
                                {item.phone && <span className="text-muted-foreground text-xs">{item.phone}</span>}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[300px] truncate" title={item.message}>{item.message}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter" className="mt-0">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-background border-b px-6 py-4">
                <CardTitle className="text-lg">Newsletter Subscribers</CardTitle>
                <CardDescription>Users who signed up for email updates.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Email Address</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Subscription Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.newsletterSubscriptions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">No subscribers yet.</TableCell>
                        </TableRow>
                      ) : (
                        data?.newsletterSubscriptions.map((item) => (
                          <TableRow key={item.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium text-primary">{item.email}</TableCell>
                            <TableCell>{item.name || "-"}</TableCell>
                            <TableCell>
                              <span className="capitalize text-xs font-semibold px-2 py-0.5 rounded-full bg-muted border">
                                {item.source}
                              </span>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
