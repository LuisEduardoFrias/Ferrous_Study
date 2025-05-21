import { Component, ReactNode, ErrorInfo } from 'react'; // Import ReactNode and ErrorInfo
import { ErrorIcon } from '../assets/svgs';

// Define the shape of your component's props
interface ErrorBoundaryProps {
  children: ReactNode; // 'children' is a common prop for React components
}

// Define the shape of your component's state
interface ErrorBoundaryState {
  hasError: boolean;
}

// Extend Component with the defined props and state interfaces
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) { // Explicitly type props
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState { // Explicitly type error
    // Update state to indicate an error has occurred
    if (!error)
      console.log(error)
      
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void { // Explicitly type error and errorInfo
    console.error("Error capturado por el Error Boundary:", error, errorInfo);
    // You might also want to log error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10">
          <div className="flex gap-3 mb-5">
            <ErrorIcon />
            <h2 className="font-extrabold">¡Algo salió mal!</h2>
          </div>
          <p>
            Ocurrió un error inesperado. Por favor, intente recargar la página.
          </p>
          <button className="mt-10" onClick={() => window.location.reload()} >Recargar</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
