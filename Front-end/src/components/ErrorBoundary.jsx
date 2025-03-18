import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-red-100 dark:bg-red-900 p-4">
                    <h1 className="text-2xl font-bold text-red-600 dark:text-red-300">Something went wrong</h1>
                    <p className="text-gray-700 dark:text-gray-300">Error: {this.state.error.message}</p>
                    <p className="text-gray-700 dark:text-gray-300">Component: {this.state.errorInfo?.componentStack}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;