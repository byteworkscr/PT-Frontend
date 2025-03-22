import { useAccount, useBalance, useChainId, useConnect, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { useCallback, useEffect, useState } from 'react';

interface MetaMaskResult {
  success: boolean;
  error?: string;
}

// Define these interfaces at the module level
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface EthereumProvider {
  isMetaMask?: boolean;
  request?: (args: RequestArguments) => Promise<unknown>;
}

interface WindowWithEthereum extends Window {
  ethereum?: EthereumProvider;
}

export const useWagmiMetaMask = () => {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
  });
  
  const [metaMaskState, setMetaMaskState] = useState({
    isInstalled: false,
    isConnected: false,
    address: null as string | null,
    balance: null as string | null,
    chainId: null as string | null,
    network: null as string | null,
  });

  // Check if MetaMask is installed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ethereum = (window as WindowWithEthereum).ethereum;
      setMetaMaskState(prev => ({
        ...prev,
        isInstalled: !!ethereum && !!ethereum.isMetaMask
      }));
    }
  }, []);

  // Get network name based on chain ID
  const getNetworkName = (chainId: number): string => {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 11155111:
        return 'Sepolia Testnet';
      case 137:
        return 'Polygon Mainnet';
      case 80001:
        return 'Mumbai Testnet';
      default:
        return `Chain ID: ${chainId}`;
    }
  };

  // Update state when connection changes
  useEffect(() => {
    if (isConnected && address && balanceData && chainId) {
      const networkName = getNetworkName(chainId);
      const chainIdHex = `0x${chainId.toString(16)}`;
      
      setMetaMaskState({
        isInstalled: true,
        isConnected: true,
        address: address,
        balance: balanceData.formatted.substring(0, 6),
        chainId: chainIdHex,
        network: networkName
      });
      
      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('metamask-wallet', JSON.stringify({
          state: {
            address,
            balance: balanceData.formatted.substring(0, 6),
            chainId: chainIdHex,
            network: networkName
          }
        }));
      }
    } else if (!isConnected) {
      setMetaMaskState(prev => ({
        ...prev,
        isConnected: false,
        address: null,
        balance: null,
        chainId: null,
        network: null
      }));
      
      // Remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('metamask-wallet');
      }
    }
  }, [isConnected, address, balanceData, chainId]);

  const connectMetaMask = useCallback(async (): Promise<MetaMaskResult> => {
    try {
      await connect({ connector: metaMask() });
      return { success: true };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to MetaMask'
      };
    }
  }, [connect]);

  const disconnectMetaMask = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return {
    ...metaMaskState,
    connectMetaMask,
    disconnectMetaMask,
    isPending
  };
};