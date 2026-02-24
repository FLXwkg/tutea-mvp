import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { DashboardLayout } from '../dashboard-layout'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock le composant Header
jest.mock('@/components/header', () => ({
  Header: () => <div data-testid="header">Header Mock</div>,
}))

describe('DashboardLayout', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('renders the component', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'TUTEUR',
    }

    render(
      <DashboardLayout user={user}>
        <div data-testid="children">Test Children</div>
      </DashboardLayout>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('displays user firstname in greeting', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'TUTEUR',
    }

    render(
      <DashboardLayout user={user}>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText(/Bonjour, John !/)).toBeInTheDocument()
  })

  it('displays welcome message', () => {
    const user = {
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'TUTELLE',
    }

    render(
      <DashboardLayout user={user}>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText(/Bienvenue sur TUTÉA/)).toBeInTheDocument()
  })

  it('displays current time', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'TUTEUR',
    }

    render(
      <DashboardLayout user={user}>
        <div>Content</div>
      </DashboardLayout>
    )

    // Vérifie que le temps est affiché (format HH:mm)
    const timeElement = screen.getByText(/\d{2}:\d{2}/)
    expect(timeElement).toBeInTheDocument()
  })

  it('renders children', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'TUTEUR',
    }

    render(
      <DashboardLayout user={user}>
        <div data-testid="children">Test Children Content</div>
      </DashboardLayout>
    )

    expect(screen.getByTestId('children')).toBeInTheDocument()
    expect(screen.getByText(/Test Children Content/)).toBeInTheDocument()
  })

  it('displays default user name when user is null', () => {
    render(
      <DashboardLayout user={null}>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText(/Bonjour, Utilisateur !/)).toBeInTheDocument()
  })
})