import useFetch from "@/hooks/useFetch"
import { prettyPrice } from "@/util/string"
export const WalletDetails = () => {
  
  const {
    isLoading,
    isSuccess,
    isError,
    data
  } = useFetch('/api/wallets')
  
  const price = data && data.wallets && data.wallets.length === 1 ? 
    prettyPrice(data.wallets[0].balance) : ''
  ;
  return (isLoading ? <p>loading...</p> : <div className="wallet-details">
    <p>Park NYC<br />
    Balance: {price}</p>
  </div>)
}

export default WalletDetails