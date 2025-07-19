import WalletDetails from "@/components/wallets/WalletDetails"
export default () => (<>
  <h3>Payment Details</h3>
  <h4>Personal</h4>
  <div className="card">
    <p>bank card info (obscured)</p>
  </div>

  <h4>EWallet</h4>
  <div className="card">
    <WalletDetails />
  </div>
</>)