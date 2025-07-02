import {render,act} from '@testing-library/react'
import {APIProvider} from '@vis.gl/react-google-maps';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY

export const renderWithMapAPI = async (View:any, props={}) => {
  return await render(
    <APIProvider apiKey={API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
      <View {...props} />
    </APIProvider>  
  )
}