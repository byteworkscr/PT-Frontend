"use client";

import { useState } from "react";
import {
  User,
  Wallet,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  ChevronDown,
  Copy,
  ExternalLink,
  Check,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TokenIcon } from "@web3icons/react";
import BackgroundAnimation from "@/components/BackgroundAnimation";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [transactionPeriod, setTransactionPeriod] = useState("all");
  const [transactionType, setTransactionType] = useState("all");
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    joinDate: "March 2023",
    bio: "Crypto enthusiast and long-term investor. Focused on DeFi and emerging blockchain technologies.",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(userData.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // Here you would typically save the data to your backend
  };

  const transactions = [
    {
      id: "tx1",
      type: "deposit",
      asset: "BTC",
      amount: "0.25",
      value: "$8,750.00",
      status: "completed",
      date: "2023-06-15T14:30:00",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    },
    {
      id: "tx2",
      type: "withdraw",
      asset: "ETH",
      amount: "2.5",
      value: "$4,625.00",
      status: "completed",
      date: "2023-06-10T09:15:00",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      id: "tx3",
      type: "swap",
      asset: "USDT",
      amount: "1,000",
      value: "$1,000.00",
      status: "completed",
      date: "2023-06-05T16:45:00",
      toAsset: "SOL",
      toAmount: "10",
    },
    {
      id: "tx4",
      type: "deposit",
      asset: "SOL",
      amount: "50",
      value: "$2,500.00",
      status: "completed",
      date: "2023-05-28T11:20:00",
      address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
    },
    {
      id: "tx5",
      type: "withdraw",
      asset: "USDC",
      amount: "500",
      value: "$500.00",
      status: "pending",
      date: "2023-05-20T13:10:00",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    if (transactionType !== "all" && tx.type !== transactionType) return false;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundAnimation />
      <div className="relative z-10 h-screen overflow-auto">
        <div className="p-4 md:p-6 space-y-6 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <div className="flex gap-2 mt-4 md:mt-0">
              {editMode ? (
                <>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white/10 text-white hover:bg-white/10"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0"
                  onClick={() => setEditMode(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="bg-white/10 text-white text-xl">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    {editMode ? (
                      <Input
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        className="text-xl font-bold bg-black/20 border-white/10 text-center mb-1"
                      />
                    ) : (
                      <h2 className="text-xl font-bold mb-1">
                        {userData.name}
                      </h2>
                    )}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-sm text-white/70 font-mono truncate">
                        {userData.walletAddress.substring(0, 6)}...
                        {userData.walletAddress.substring(
                          userData.walletAddress.length - 4
                        )}
                      </span>
                      <button
                        className="text-white/70 hover:text-white"
                        onClick={handleCopyAddress}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-white/10 text-white/70"
                    >
                      Member since {userData.joinDate}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {editMode ? (
                      <div className="space-y-2">
                        <label className="text-sm text-white/70">Bio</label>
                        <textarea
                          value={userData.bio}
                          onChange={(e) =>
                            setUserData({ ...userData, bio: e.target.value })
                          }
                          rows={3}
                          className="w-full bg-black/20 border-white/10 rounded-md text-white p-2 text-sm"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-white/90">{userData.bio}</p>
                    )}

                    <div className="pt-4 border-t border-white/10">
                      <h3 className="text-sm font-medium mb-3">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-8 flex-shrink-0 text-white/70">
                            <User className="h-4 w-4" />
                          </div>
                          {editMode ? (
                            <Input
                              value={userData.email}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  email: e.target.value,
                                })
                              }
                              className="flex-1 h-8 bg-black/20 border-white/10 text-sm"
                            />
                          ) : (
                            <span className="text-sm">{userData.email}</span>
                          )}
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 flex-shrink-0 text-white/70">
                            <Wallet className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-mono truncate">
                            {userData.walletAddress.substring(0, 12)}...
                          </span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 flex-shrink-0 text-white/70">
                            <Clock className="h-4 w-4" />
                          </div>
                          <span className="text-sm">
                            Member since {userData.joinDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs
                defaultValue="overview"
                className="w-full"
                onValueChange={setActiveTab}
              >
                <TabsList className="bg-black/40 border border-white/10 mb-6">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-white/10 text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="transactions"
                    className="data-[state=active]:bg-white/10 text-white"
                  >
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-white/10 text-white"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <CardTitle>Account Overview</CardTitle>
                      <CardDescription className="text-white/70">
                        Summary of your account activity and balances
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Portfolio Balance
                          </h3>
                          <div className="text-3xl font-bold">$124,578.90</div>
                          <div className="text-sm text-green-400">
                            +5.25% (24h)
                          </div>

                          <h4 className="text-sm font-medium text-white/70 mt-6">
                            Asset Allocation
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-full bg-white/10 rounded-full h-2.5">
                                <div
                                  className="bg-gradient-to-r from-[#0291fc] to-[#c46be3] h-2.5 rounded-full"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs text-white/70">
                                45%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#0291fc] mr-1"></div>
                                <span>Bitcoin</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#4c6fff] mr-1"></div>
                                <span>Ethereum</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#9d5cff] mr-1"></div>
                                <span>Solana</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#c46be3] mr-1"></div>
                                <span>Others</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Recent Activity
                          </h3>
                          <div className="space-y-3">
                            {transactions.slice(0, 3).map((tx) => (
                              <div
                                key={tx.id}
                                className="flex items-center justify-between p-2 bg-white/5 rounded-md"
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      tx.type === "deposit"
                                        ? "bg-green-500/20"
                                        : tx.type === "withdraw"
                                        ? "bg-red-500/20"
                                        : "bg-blue-500/20"
                                    }`}
                                  >
                                    {tx.type === "deposit" ? (
                                      <ArrowDownLeft
                                        className={`h-4 w-4 text-green-400`}
                                      />
                                    ) : tx.type === "withdraw" ? (
                                      <ArrowUpRight
                                        className={`h-4 w-4 text-red-400`}
                                      />
                                    ) : (
                                      <ArrowUpRight
                                        className={`h-4 w-4 text-blue-400`}
                                      />
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium capitalize">
                                      {tx.type}
                                    </div>
                                    <div className="text-xs text-white/70">
                                      {new Date(tx.date).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    {tx.type === "deposit"
                                      ? "+"
                                      : tx.type === "withdraw"
                                      ? "-"
                                      : ""}
                                    {tx.amount} {tx.asset}
                                  </div>
                                  <div className="text-xs text-white/70">
                                    {tx.value}
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              className="w-full bg-transparent border-white/10 text-white hover:bg-white/10"
                              onClick={() => setActiveTab("transactions")}
                            >
                              View All Transactions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transactions" className="space-y-6">
                  <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                          <CardTitle>Transaction History</CardTitle>
                          <CardDescription className="text-white/70">
                            View and filter your transaction history
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Select
                            value={transactionType}
                            onValueChange={setTransactionType}
                          >
                            <SelectTrigger className="w-[130px] bg-black/20 border-white/10 text-white h-9">
                              <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1B2735] border-white/10 text-white">
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="deposit">Deposits</SelectItem>
                              <SelectItem value="withdraw">
                                Withdrawals
                              </SelectItem>
                              <SelectItem value="swap">Swaps</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={transactionPeriod}
                            onValueChange={setTransactionPeriod}
                          >
                            <SelectTrigger className="w-[130px] bg-black/20 border-white/10 text-white h-9">
                              <SelectValue placeholder="Time period" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1B2735] border-white/10 text-white">
                              <SelectItem value="all">All Time</SelectItem>
                              <SelectItem value="week">Last Week</SelectItem>
                              <SelectItem value="month">Last Month</SelectItem>
                              <SelectItem value="year">Last Year</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-black/20 border-white/10 text-white h-9 w-9"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-3 px-4 text-xs font-medium text-white/70">
                                Type
                              </th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-white/70">
                                Asset
                              </th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-white/70">
                                Amount
                              </th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-white/70">
                                Value
                              </th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-white/70">
                                Date
                              </th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-white/70">
                                Status
                              </th>
                              <th className="text-right py-3 px-4 text-xs font-medium text-white/70">
                                Details
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTransactions.map((tx) => (
                              <tr
                                key={tx.id}
                                className="border-b border-white/5 hover:bg-white/5"
                              >
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        tx.type === "deposit"
                                          ? "bg-green-500/20"
                                          : tx.type === "withdraw"
                                          ? "bg-red-500/20"
                                          : "bg-blue-500/20"
                                      }`}
                                    >
                                      {tx.type === "deposit" ? (
                                        <ArrowDownLeft
                                          className={`h-4 w-4 text-green-400`}
                                        />
                                      ) : tx.type === "withdraw" ? (
                                        <ArrowUpRight
                                          className={`h-4 w-4 text-red-400`}
                                        />
                                      ) : (
                                        <ArrowUpRight
                                          className={`h-4 w-4 text-blue-400`}
                                        />
                                      )}
                                    </div>
                                    <span className="ml-2 text-sm capitalize">
                                      {tx.type}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center overflow-hidden mr-1">
                                      <TokenIcon
                                        symbol={tx.asset.toLowerCase()}
                                        size={14}
                                      />
                                    </div>
                                    <span className="text-sm">{tx.asset}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {tx.type === "swap" ? (
                                    <div className="flex items-center">
                                      {tx.amount} {tx.asset}
                                      <ArrowUpRight className="h-3 w-3 mx-1 text-white/50" />
                                      {tx.toAmount} {tx.toAsset}
                                    </div>
                                  ) : (
                                    <span>
                                      {tx.amount} {tx.asset}
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {tx.value}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {new Date(tx.date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  <Badge
                                    className={`${
                                      tx.status === "completed"
                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                        : tx.status === "pending"
                                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                        : "bg-red-500/20 text-red-400 border-red-500/30"
                                    }`}
                                  >
                                    {tx.status}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white/70"
                                      >
                                        <ChevronDown className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="w-56 bg-[#1B2735] border-white/10 text-white"
                                    >
                                      <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View on Explorer
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy Transaction ID
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {filteredTransactions.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-white/70">
                            No transactions found matching your filters.
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-white/70">
                          Showing {filteredTransactions.length} of{" "}
                          {transactions.length} transactions
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-black/20 border-white/10 text-white"
                          >
                            Previous
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-black/20 border-white/10 text-white"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="settings"
                  className="space-y-6 overflow-auto"
                >
                  <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription className="text-white/70">
                        Manage your profile information and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-visible pb-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label
                                htmlFor="profile-name"
                                className="text-white/70 text-sm"
                              >
                                Full Name
                              </Label>
                              <Input
                                id="profile-name"
                                defaultValue={userData.name}
                                className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor="profile-email"
                                className="text-white/70 text-sm"
                              >
                                Email Address
                              </Label>
                              <Input
                                id="profile-email"
                                type="email"
                                defaultValue={userData.email}
                                className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor="profile-phone"
                                className="text-white/70 text-sm"
                              >
                                Phone Number
                              </Label>
                              <Input
                                id="profile-phone"
                                type="tel"
                                defaultValue={userData.phone}
                                className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor="profile-location"
                                className="text-white/70 text-sm"
                              >
                                Location
                              </Label>
                              <Input
                                id="profile-location"
                                defaultValue={userData.location}
                                className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">
                            Profile Picture
                          </h3>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src="/placeholder.svg?height=64&width=64" />
                              <AvatarFallback className="bg-white/10 text-white">
                                JD
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="bg-black/20 border-white/10 text-white"
                              >
                                Upload New
                              </Button>
                              <Button
                                variant="outline"
                                className="bg-black/20 border-white/10 text-white"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Bio</h3>
                          <textarea
                            rows={3}
                            defaultValue={userData.bio}
                            className="w-full border-0 bg-black/20 rounded-md border-white/10 text-white p-2 resize-none"
                          ></textarea>
                        </div>

                        <Button className="bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200">
                          Save Profile Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
