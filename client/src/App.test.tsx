import {describe,it,expect} from 'vitest'
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Renders <App />', async () => {
    render(<App />)

    const h1 = await screen.findByText('Ahoy')
    expect(h1).toBeInTheDocument()
  })
})