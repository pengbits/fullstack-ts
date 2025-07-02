import {describe,it,expect} from 'vitest'
import { screen } from '@testing-library/react';
import {renderWithMapAPI} from '../../test/renderMapUtils'
import Map from './Map';



describe('Map', () => {
  it('Renders <MapContainer {lat,lon} />', async () => {
    await renderWithMapAPI(Map)
    expect(await screen.findByTestId('map')).toBeInTheDocument()
  })
})