"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState("preferences");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("usd");
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-white/10 bg-gradient-to-b from-[#1B2735] to-[#090A0F] text-white">
        <div className="relative z-10 bg-black/40 backdrop-blur-md overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl">Settings</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-white/70 text-sm">
              Customize your experience and manage your preferences
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="preferences"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 bg-black/30 border border-white/10 mx-4 rounded-md">
              <TabsTrigger
                value="appearance"
                className="data-[state=active]:bg-white/10 text-white font-medium text-sm py-1.5"
              >
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-white/10 text-white font-medium text-sm py-1.5"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-white/10 text-white font-medium text-sm py-1.5"
              >
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Color Theme
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-10 rounded-md bg-gradient-to-r from-[#0291fc] to-[#c46be3] cursor-pointer border-2 border-white"></div>
                    <div className="h-10 rounded-md bg-gradient-to-r from-[#00c6ff] to-[#0072ff] cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-gradient-to-r from-[#fc466b] to-[#3f5efb] cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-gradient-to-r from-[#11998e] to-[#38ef7d] cursor-pointer"></div>
                    <div className="h-10 rounded-md bg-gradient-to-r from-[#f12711] to-[#f5af19] cursor-pointer"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Font Size
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-white/70">A</span>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      defaultValue="2"
                      className="flex-1 h-2 bg-black/30 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-base text-white/70">A</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Layout Density
                  </Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9">
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2735] border-white/10 text-white">
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200 h-10">
                Save Appearance Settings
              </Button>
            </TabsContent>

            <TabsContent value="notifications" className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white text-sm font-medium">
                      Enable Notifications
                    </Label>
                    <p className="text-white/70 text-xs">
                      Receive notifications about your account and transactions
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-[#0291fc]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Notification Types
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">
                        Price Alerts
                      </span>
                      <Switch
                        defaultChecked
                        className="data-[state=checked]:bg-[#0291fc]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">
                        Transaction Updates
                      </span>
                      <Switch
                        defaultChecked
                        className="data-[state=checked]:bg-[#0291fc]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">
                        Security Alerts
                      </span>
                      <Switch
                        defaultChecked
                        className="data-[state=checked]:bg-[#0291fc]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">Newsletter</span>
                      <Switch className="data-[state=checked]:bg-[#0291fc]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">Marketing</span>
                      <Switch className="data-[state=checked]:bg-[#0291fc]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Notification Channels
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">Email</span>
                      <Switch
                        defaultChecked
                        className="data-[state=checked]:bg-[#0291fc]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">
                        Push Notifications
                      </span>
                      <Switch
                        defaultChecked
                        className="data-[state=checked]:bg-[#0291fc]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/90">SMS</span>
                      <Switch className="data-[state=checked]:bg-[#0291fc]" />
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200 h-10">
                Save Notification Settings
              </Button>
            </TabsContent>

            <TabsContent value="preferences" className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Language
                  </Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2735] border-white/10 text-white">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Currency
                  </Label>
                  <Select defaultValue={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2735] border-white/10 text-white">
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                      <SelectItem value="cny">CNY (¥)</SelectItem>
                      <SelectItem value="btc">BTC (₿)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white text-sm font-medium">
                      Show Balance
                    </Label>
                    <p className="text-white/70 text-xs">
                      Display your account balance on the dashboard
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4 text-white/70" />
                    <Switch
                      checked={showBalance}
                      onCheckedChange={setShowBalance}
                      className="data-[state=checked]:bg-[#0291fc]"
                    />
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Default Dashboard View
                  </Label>
                  <Select defaultValue="overview">
                    <SelectTrigger className="border-0 bg-black/20 rounded-md border-white/10 text-white h-9">
                      <SelectValue placeholder="Select default view" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B2735] border-white/10 text-white">
                      <SelectItem value="overview">Overview</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="transactions">Transactions</SelectItem>
                      <SelectItem value="markets">Markets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm font-medium">
                    Time Format
                  </Label>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-white/10 border-white/10 text-white hover:bg-white/20"
                    >
                      12-hour
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent border-white/10 text-white hover:bg-white/10"
                    >
                      24-hour
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200 h-10">
                Save Preferences
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
