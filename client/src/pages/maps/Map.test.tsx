import {describe,it,expect} from 'vitest'
import { screen, act } from '@testing-library/react';
import {renderWithMapAPI} from '../../../test/renderMapUtils'
import Map from './Map';


// things get pretty gnarly if you want to actually assert against the map instance
// https://github.com/visgl/react-google-maps/discussions/204

describe('Map', () => {
  describe('Page', () => {
    it('Renders <MapContainer /> into Pages::Map', async () => {
      await act(async() => {
        await renderWithMapAPI(Map, {
          lat:40.645344, 
          lon:-73.9617345,
          defaultZoom:15,
          mapId:process.env.GOOGLE_MAPS_MAP_ID
        })
      })
      expect(await screen.findByTestId('map')).toBeInTheDocument()
    })
  })
})