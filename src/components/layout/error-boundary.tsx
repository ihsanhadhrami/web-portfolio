import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render-time errors anywhere in the tree and shows a recoverable
 * fallback instead of crashing the whole app to a blank screen.
 * Error boundaries must be class components (no hook equivalent exists).
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // Surface the error for local debugging / future logging service.
    console.error('Uncaught error:', error, info.componentStack);
  }

  private readonly handleReset = (): void => {
    this.setState({ hasError: false });
  };

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          An unexpected error occurred. Try again, or reload the page if the
          problem persists.
        </p>
        <Button onClick={this.handleReset} className="mt-2">
          <RotateCcw className="size-4" />
          Try again
        </Button>
      </div>
    );
  }
}
