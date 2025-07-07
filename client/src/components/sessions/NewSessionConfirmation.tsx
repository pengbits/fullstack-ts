interface NewSessionConfirmationProps {
  id:string | null,
  start_time:string,
  end_time:string,
  cost:string
}
const NewSessionConfirmation = ({
  id,
  start_time,
  end_time,
  cost
}:NewSessionConfirmationProps) => (
  <div style={{padding:'15px'}}>
    <h3>Transaction Confirmation</h3>
    <p>Your payment has been successfully completed.</p>
    <p className="session-details">
      <b>Transaction No.</b> {id}<br />
      <b>Start Time</b> {start_time}<br />
      <b>End Time</b> {end_time}<br />
      <b>eWallet</b>{cost}
    </p>
    <p className="primary-button">
      <a href="/sessions/active">Done</a>
    </p>
</div>)

export default NewSessionConfirmation