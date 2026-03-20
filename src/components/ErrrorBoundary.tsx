// ErrorBoundary.tsx

import  { Component} from "react";
import type {  ReactNode } from "react";


type Props = {

children: ReactNode;

fallback?: ReactNode;

};



type State = {

hasError: boolean;

error?: Error;

};



export class ErrorBoundary extends Component<Props, State> {

state: State = {

hasError: false,

error: undefined,

};



static getDerivedStateFromError(error: Error) {

// Update state so the next render shows fallback UI

return { hasError: true, error };

}



componentDidCatch(error: Error, info: any) {

// You can log errors to an external service here

console.error("Error caught by ErrorBoundary:", error, info);

}



render() {

if (this.state.hasError) {

return (

this.props.fallback || (

<div className="p-6 text-center text-red-700">

<h2>Something went wrong.</h2>

<p>{this.state.error?.message}</p>

</div>

)

);

}



return this.props.children;

}

}