import React from "react";
import App from "next/app";
import axios from "axios";
import "../sass/main.scss";
export default class NEXT_App extends App {
    state = {
        data: null,
    };
    setData = (res: any) => this.setState({data: res.data});
    getData = () => axios.get("/api/getData/").then((res: any) => this.setData(res));
    componentDidMount() {
        this.getData();
    }
    render() {
        const {Component, pageProps} = this.props;
        return <React.Fragment>{this.state.data ? <Component {...pageProps} data={this.state.data} /> : null}</React.Fragment>;
    }
}
