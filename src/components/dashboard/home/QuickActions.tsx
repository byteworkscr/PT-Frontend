import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  LineChart,
  Plus,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const actions = [
    {
      id: "1",
      title: "Deposit",
      icon: Plus,
      color: "bg-green-500/20 text-green-500",
    },
    {
      id: "2",
      title: "Withdraw",
      icon: Wallet,
      color: "bg-blue-500/20 text-blue-500",
    },
    {
      id: "3",
      title: "Trade",
      icon: ArrowUpRight,
      color: "bg-purple-500/20 text-purple-500",
    },
    {
      id: "4",
      title: "Simulator",
      icon: LineChart,
      color: "bg-orange-500/20 text-orange-500",
    },
    {
      id: "5",
      title: "Analytics",
      icon: BarChart3,
      color: "bg-cyan-500/20 text-cyan-500",
    },
    {
      id: "6",
      title: "Payment",
      icon: CreditCard,
      color: "bg-pink-500/20 text-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          className="flex flex-col items-center justify-center h-20 bg-black/20 border-white/10 hover:bg-white/5 hover:text-gray-200"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color} mb-1`}
          >
            <action.icon className="h-4 w-4" />
          </div>
          <span className="text-xs">{action.title}</span>
        </Button>
      ))}
    </div>
  );
}
