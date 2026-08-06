export class ErrorBoundary extends React.Component {
    state = { hasError : false }
    
    static GetDerivedStateFromError(error){
        return { hasError: true, error }
    }
    
    //log to database or some other service
    componentDidCatch(error) {
        console.error("Error: ", error)
    }
    
    render() {
        if(this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}