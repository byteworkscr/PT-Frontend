"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  DollarSign,
  Plus,
  Sidebar,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioOverview } from "./PortfolioOverview";
import { AssetAllocation } from "./AssetAllocation";
import { MarketTrends } from "./MarketTrends";
import { QuickActions } from "./QuickActions";
import { RecentTransactions } from "./RecentTransactions";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { SwapModal } from "../swap/SwapModal";
import { Header } from "@/layouts/Header";

export default function DashboardLayout() {
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  const openSwapModal = () => {
    setIsSwapModalOpen(true);
  };

  const closeSwapModal = () => {
    setIsSwapModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundAnimation />
      <div className="relative z-10 flex h-screen overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, John
                </h1>
                <p className="text-white/70">
                  Here's what's happening with your investments today.
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r mr-2 from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200">
                  <Plus className="h-4 w-4" /> Add Funds
                </Button>
                <Button
                  className="bg-gradient-to-r mr-2 from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200"
                  onClick={() => setIsSwapModalOpen(true)}
                >
                  <ArrowRightLeft className="h-4 w-4" /> Swap
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-gray-200"
                >
                  <Wallet className="h-4 w-4" /> Withdraw
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-white/70">
                    Total Balance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$124,578.90</div>
                  <div className="flex items-center mt-1 text-green-400 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" /> +5.25%
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-white/70">
                    Digital Assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$78,245.30</div>
                  <div className="flex items-center mt-1 text-green-400 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" /> +7.12%
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-white/70">
                    Physical Assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$46,333.60</div>
                  <div className="flex items-center mt-1 text-green-400 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" /> +2.45%
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-white/70">
                    Available Cash
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,500.00</div>
                  <div className="flex items-center mt-1 text-white/70 text-sm">
                    <DollarSign className="h-4 w-4 mr-1" /> Ready to invest
                  </div>
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-black/40 border border-white/10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white/10 text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-white/10 text-white"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="data-[state=active]:bg-white/10 text-white"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="markets"
                  className="data-[state=active]:bg-white/10 text-white"
                >
                  Markets
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="md:col-span-2 bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <CardTitle>Portfolio Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PortfolioOverview />
                    </CardContent>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <CardTitle>Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AssetAllocation />
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RecentTransactions />
                    </CardContent>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <CardTitle>Market Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MarketTrends />
                    </CardContent>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <QuickActions />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="portfolio" className="space-y-4">
                <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                  <CardHeader>
                    <CardTitle>Your Portfolio</CardTitle>
                    <CardDescription className="text-white/70">
                      Manage and track your investments across different asset
                      classes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">
                      Portfolio content will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="transactions" className="space-y-4">
                <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription className="text-white/70">
                      View and filter your recent transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">
                      Transaction history will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="markets" className="space-y-4">
                <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                  <CardHeader>
                    <CardTitle>Market Overview</CardTitle>
                    <CardDescription className="text-white/70">
                      Track market trends and discover investment opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">
                      Market data will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <SwapModal open={isSwapModalOpen} onOpenChange={setIsSwapModalOpen} />
    </div>
  );
}
