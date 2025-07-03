import {describe,it,expect} from 'vitest'
import { render, screen, act, within } from '@testing-library/react';
import MarkerCollection from './MarkerCollection';
import GetMetersMock from '../mocks/GetMetersMock.small';
import type { MarkerGroupAttributes } from './MarkerGroup';
import {vi, beforeEach} from 'vitest';

beforeEach(async() => {
  vi.mock('@/components/MarkerGroup', () => ({
    default: ({
      lat,
      lon,
      count
    }:MarkerGroupAttributes) => (
      <p data-loc={`${lat},${lon}`} data-testid='marker-group'>{count}</p>
    )
  }))
})

describe('MarkerCollection', () => {
  it.todo('renders meters as a collection when zoom is great enough')
  it('renders a meter-group when zoom is less than required minimum', async () => {
    render(<MarkerCollection 
      data={GetMetersMock}
      zoom={10}
      center={{lat:() => (40.640248), lng:() => (-73.946193)}}
    />)

    const markerGroup = await screen.findByTestId('marker-group')
    expect(markerGroup).toBeInTheDocument()
  })
})