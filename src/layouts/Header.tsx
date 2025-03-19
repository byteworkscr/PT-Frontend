import { Button } from "@/components/ui/button";
import { Search, Bell, User, Star } from "lucide-react";

interface HeaderProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-white/10 bg-black/40 backdrop-blur-md px-4 sm:px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="md:hidden flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] p-1">
            <Star className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white">CosmicInvest</span>
        </div>
        <form className="hidden md:flex-1 md:flex max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-white/5 border-white/10 rounded-md pl-8 pr-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#0291fc]"
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-gray-200"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-gray-200"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
