import './MarkerPin.css'

const MarkerPin = ({meter_number}) => {
  return (<div className='marker-pin'>
    <span className='meter-nunber'>{meter_number}</span>
    <div className='tail'></div>
  </div>)
}

export default MarkerPin