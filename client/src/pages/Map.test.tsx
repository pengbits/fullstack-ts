import {describe,it,expect} from 'vitest'
import { screen, act } from '@testing-library/react';
import {renderWithMapAPI} from '../../test/renderMapUtils'
import Map from './Map';


// things get pretty gnarly if you want to actually assert against the map instance
// https://github.com/visgl/react-google-maps/discussions/204

describe('Map', () => {
  describe('Component', () => {
    it('Renders <MapContainer {lat,lon} />', async () => {
      await act(async() => {
        await renderWithMapAPI(Map, {lat:40.645344, lon:-73.9617345})
      })
      expect(await screen.findByTestId('map')).toBeInTheDocument()
    })
  })
  
  describe('MapProps', () => {
    it('accepts lat, lon, and zoom props', async () => {
      const SAFB = {lat:40.6488136,lon:-73.9602228, zoom:17}
      await renderWithMapAPI(Map, SAFB)
    })
  })

  describe('Map#getVisibleArea', () => {
    it('returns the current map as a boundry box suitable for searching', async () => {
      const SAFB = {lat:40.6488136,lon:-73.9602228, zoom:17}
      await renderWithMapAPI(Map, SAFB)
    })
  })
})