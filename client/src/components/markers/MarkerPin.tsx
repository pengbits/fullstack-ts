import './MarkerPin.css'
export interface MarkerPinProps {
  label: string,
  showTail?:boolean
}

const MarkerPin = ({label,showTail}:MarkerPinProps) => {
  return (<div className='marker-pin'>
    <span className='marker-label'>{label}</span>
    {showTail && <div className='tail'></div>}
  </div>)
}

export default MarkerPin