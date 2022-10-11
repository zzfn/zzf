import React from 'react';
type MyProps = {
  children: React.ReactNode;
};
type MyState = {
  hasError: boolean;
};
class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log(9999, { error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button type='button' onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
