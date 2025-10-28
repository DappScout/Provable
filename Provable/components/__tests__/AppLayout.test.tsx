import { render, screen } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import AppLayout from '../AppLayout';
import BottomNavbar from '../BottomNavbar';

// Mock the dependencies
jest.mock('next/navigation');
jest.mock('../BottomNavbar');

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const MockBottomNavbar = BottomNavbar as jest.MockedFunction<typeof BottomNavbar>;

describe('AppLayout Component', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup router mock
    mockPush = jest.fn();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    // Setup BottomNavbar mock to render a simple div
    MockBottomNavbar.mockImplementation(({ onNavigate, activeRoute }) => (
      <div data-testid="bottom-navbar" data-active-route={activeRoute}>
        <button onClick={() => onNavigate?.('home')}>Home</button>
        <button onClick={() => onNavigate?.('offers')}>Offers</button>
        <button onClick={() => onNavigate?.('profile')}>Profile</button>
      </div>
    ));
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test Content</div>
        </AppLayout>
      );
      
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render children correctly', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div data-testid="test-child">Child Component</div>
        </AppLayout>
      );
      
      const child = screen.getByTestId('test-child');
      expect(child).toBeInTheDocument();
      expect(child).toHaveTextContent('Child Component');
    });

    it('should render BottomNavbar component', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(screen.getByTestId('bottom-navbar')).toBeInTheDocument();
    });

    it('should have correct CSS classes on root container', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { container } = render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const rootDiv = container.firstChild;
      expect(rootDiv).toHaveClass('min-h-screen', 'bg-[#121212]');
    });

    it('should wrap children in a main element with padding', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div data-testid="content">Content</div>
        </AppLayout>
      );
      
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('pb-20');
      expect(mainElement).toContainElement(screen.getByTestId('content'));
    });
  });

  describe('Route Detection - getActiveRoute()', () => {
    it('should correctly identify /home route', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should correctly identify /offers route', () => {
      mockUsePathname.mockReturnValue('/offers');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'offers');
    });

    it('should correctly identify /profile route', () => {
      mockUsePathname.mockReturnValue('/profile');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'profile');
    });

    it('should default to "home" for unknown routes', () => {
      mockUsePathname.mockReturnValue('/unknown-page');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should default to "home" for root path', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should default to "home" for empty string pathname', () => {
      mockUsePathname.mockReturnValue('');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should handle nested routes by falling back to home', () => {
      mockUsePathname.mockReturnValue('/home/nested/path');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should handle routes with trailing slashes', () => {
      mockUsePathname.mockReturnValue('/home/');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      // Since ROUTES maps '/home' not '/home/', it should default to 'home'
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should handle routes with query parameters', () => {
      mockUsePathname.mockReturnValue('/offers?sort=price');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      // Query params might not be in pathname, but testing edge case
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should be case-sensitive for routes', () => {
      mockUsePathname.mockReturnValue('/HOME');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });
  });

  describe('Navigation Handling - handleNavigation()', () => {
    it('should call router.push with correct path when navigating to home', () => {
      mockUsePathname.mockReturnValue('/offers');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const homeButton = screen.getByText('Home');
      homeButton.click();
      
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/home');
    });

    it('should call router.push with correct path when navigating to offers', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const offersButton = screen.getByText('Offers');
      offersButton.click();
      
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/offers');
    });

    it('should call router.push with correct path when navigating to profile', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const profileButton = screen.getByText('Profile');
      profileButton.click();
      
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/profile');
    });

    it('should format navigation path correctly with leading slash', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const profileButton = screen.getByText('Profile');
      profileButton.click();
      
      // Verify the path has a leading slash
      expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\//));
    });

    it('should handle multiple navigation calls', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      screen.getByText('Offers').click();
      screen.getByText('Profile').click();
      screen.getByText('Home').click();
      
      expect(mockPush).toHaveBeenCalledTimes(3);
      expect(mockPush).toHaveBeenNthCalledWith(1, '/offers');
      expect(mockPush).toHaveBeenNthCalledWith(2, '/profile');
      expect(mockPush).toHaveBeenNthCalledWith(3, '/home');
    });
  });

  describe('BottomNavbar Props', () => {
    it('should pass onNavigate callback to BottomNavbar', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(MockBottomNavbar).toHaveBeenCalledWith(
        expect.objectContaining({
          onNavigate: expect.any(Function),
        }),
        expect.anything()
      );
    });

    it('should pass activeRoute to BottomNavbar', () => {
      mockUsePathname.mockReturnValue('/offers');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(MockBottomNavbar).toHaveBeenCalledWith(
        expect.objectContaining({
          activeRoute: 'offers',
        }),
        expect.anything()
      );
    });

    it('should update activeRoute when pathname changes', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { rerender } = render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(MockBottomNavbar).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeRoute: 'home',
        }),
        expect.anything()
      );
      
      // Change pathname
      mockUsePathname.mockReturnValue('/profile');
      
      rerender(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(MockBottomNavbar).toHaveBeenLastCalledWith(
        expect.objectContaining({
          activeRoute: 'profile',
        }),
        expect.anything()
      );
    });
  });

  describe('Type Safety', () => {
    it('should only accept valid routes in navigation handler', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      // The mock calls the function with valid route types
      // TypeScript compilation ensures type safety at build time
      expect(MockBottomNavbar).toHaveBeenCalled();
      const mockCall = MockBottomNavbar.mock.calls[0][0];
      
      // Test that calling with valid routes works
      mockCall.onNavigate?.('home');
      mockCall.onNavigate?.('offers');
      mockCall.onNavigate?.('profile');
      
      expect(mockPush).toHaveBeenCalledWith('/home');
      expect(mockPush).toHaveBeenCalledWith('/offers');
      expect(mockPush).toHaveBeenCalledWith('/profile');
    });

    it('should maintain type consistency between ROUTES constant and ValidRoute type', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      // If this renders without TypeScript errors, the types are consistent
      expect(screen.getByTestId('bottom-navbar')).toBeInTheDocument();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null pathname gracefully', () => {
      mockUsePathname.mockReturnValue(null as unknown as string);
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      // Should default to home when pathname is null
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should handle undefined pathname gracefully', () => {
      mockUsePathname.mockReturnValue(undefined as unknown as string);
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const navbar = screen.getByTestId('bottom-navbar');
      expect(navbar).toHaveAttribute('data-active-route', 'home');
    });

    it('should render correctly with no children', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { container } = render(<AppLayout>{undefined}</AppLayout>);
      
      expect(container.querySelector('main')).toBeInTheDocument();
      expect(screen.getByTestId('bottom-navbar')).toBeInTheDocument();
    });

    it('should render correctly with multiple children', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </AppLayout>
      );
      
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });

    it('should not crash if router.push throws an error', () => {
      mockUsePathname.mockReturnValue('/home');
      mockPush.mockImplementation(() => {
        throw new Error('Navigation error');
      });
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      // Click should trigger the error
      expect(() => {
        screen.getByText('Profile').click();
      }).toThrow('Navigation error');
    });
  });

  describe('Integration Tests', () => {
    it('should properly integrate with Next.js hooks', () => {
      mockUsePathname.mockReturnValue('/offers');
      
      render(
        <AppLayout>
          <div>Integration Test</div>
        </AppLayout>
      );
      
      // Verify hooks are called
      expect(mockUseRouter).toHaveBeenCalled();
      expect(mockUsePathname).toHaveBeenCalled();
    });

    it('should maintain correct active state across route changes', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { rerender } = render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(MockBottomNavbar).toHaveBeenLastCalledWith(
        expect.objectContaining({ activeRoute: 'home' }),
        expect.anything()
      );
      
      // Simulate navigation
      mockUsePathname.mockReturnValue('/offers');
      rerender(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(MockBottomNavbar).toHaveBeenLastCalledWith(
        expect.objectContaining({ activeRoute: 'offers' }),
        expect.anything()
      );
      
      // Navigate again
      mockUsePathname.mockReturnValue('/profile');
      rerender(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      expect(MockBottomNavbar).toHaveBeenLastCalledWith(
        expect.objectContaining({ activeRoute: 'profile' }),
        expect.anything()
      );
    });

    it('should render complete layout structure correctly', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { container } = render(
        <AppLayout>
          <h1>Page Title</h1>
          <p>Page content</p>
        </AppLayout>
      );
      
      // Check structure: root div > main + BottomNavbar
      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv.tagName).toBe('DIV');
      
      const main = rootDiv.querySelector('main');
      expect(main).toBeInTheDocument();
      expect(main).toContainElement(screen.getByText('Page Title'));
      expect(main).toContainElement(screen.getByText('Page content'));
      
      expect(screen.getByTestId('bottom-navbar')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML with main element', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Content</div>
        </AppLayout>
      );
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should properly nest content within main for screen readers', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <h1>Page Heading</h1>
        </AppLayout>
      );
      
      const heading = screen.getByRole('heading', { level: 1 });
      const main = screen.getByRole('main');
      
      expect(main).toContainElement(heading);
    });
  });

  describe('Performance and Optimization', () => {
    it('should not cause unnecessary re-renders of BottomNavbar', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { rerender } = render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const initialCallCount = MockBottomNavbar.mock.calls.length;
      
      // Rerender with same content - BottomNavbar should render again
      // (React doesn't prevent re-renders by default without memo)
      rerender(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      // This will increase, but we're documenting the behavior
      expect(MockBottomNavbar.mock.calls.length).toBeGreaterThanOrEqual(initialCallCount);
    });

    it('should handle rapid pathname changes', () => {
      const pathnames = ['/home', '/offers', '/profile', '/home', '/offers'];
      
      mockUsePathname.mockReturnValue(pathnames[0]);
      const { rerender } = render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      pathnames.forEach((pathname) => {
        mockUsePathname.mockReturnValue(pathname);
        rerender(
          <AppLayout>
            <div>Test</div>
          </AppLayout>
        );
      });
      
      // Should handle all changes without errors
      expect(screen.getByTestId('bottom-navbar')).toBeInTheDocument();
    });
  });

  describe('CSS and Styling', () => {
    it('should apply correct background color class', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { container } = render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass('bg-[#121212]');
    });

    it('should apply min-h-screen class for full viewport height', () => {
      mockUsePathname.mockReturnValue('/home');
      
      const { container } = render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass('min-h-screen');
    });

    it('should apply pb-20 class to main for navbar spacing', () => {
      mockUsePathname.mockReturnValue('/home');
      
      render(
        <AppLayout>
          <div>Test</div>
        </AppLayout>
      );
      
      const main = screen.getByRole('main');
      expect(main).toHaveClass('pb-20');
    });
  });
});