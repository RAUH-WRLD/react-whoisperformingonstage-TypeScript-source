import React from "react";
import NEXT_Layout_1 from "../layouts/Layout_1";
import NEXT_Information from "../components/Information";
interface Props {
    data: any;
}
export default class NEXT_About extends React.Component<Props> {
    state = {
        didLoad: false,
    };
    getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
    setLoadingStatus = (status: boolean) => setTimeout(() => this.setState({didLoad: status}), this.getRandomNum(1000, 3000));
    componentDidMount() {
        this.setLoadingStatus(true);
    }
    render(): React.ReactNode {
        return (
            <NEXT_Layout_1 data_extra={this.props.data.about} data_header={this.props.data.header} data_footer={this.props.data.footer} isUsingLoading={!this.state.didLoad}>
                <NEXT_Information data_extra={this.props.data.about} data_main={this.props.data.main} className={"about"} isUsingLoading={!this.state.didLoad} />
            </NEXT_Layout_1>
        );
    }
}
