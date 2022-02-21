import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'

describe('Home', () => {
    const emptyProps = {results: undefined, errors: undefined};

    it('renders a heading', () => {
        render(<Home popular={emptyProps} />)

        const heading = screen.getByRole('heading', {
            name: /movie browser/i,
        })

        expect(heading).toBeInTheDocument();
    });

    it('renders movie type nav buttons', () => {
        render(<Home popular={emptyProps} />)

        const popularBtn = screen.getByRole('button', {
            name: /popular/i,
        })

        expect(popularBtn).toBeInTheDocument();
    });
})
