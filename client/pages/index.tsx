import React from "react";
import Router from "next/router";
export default class NEXT_Index extends React.Component {
    componentDidMount() {
        Router.push("/home");
    }
    render(): React.ReactNode {
        return <React.Fragment></React.Fragment>;
    }
}
