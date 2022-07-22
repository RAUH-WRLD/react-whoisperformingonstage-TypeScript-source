import React from "react";
import Head from "next/head";
import NEXT_Header from "../components/Header";
import NEXT_Footer from "../components/Footer";
import NEXT_Loading from "../components/Loading";
interface Props {
    children: any;
    data_extra: any;
    data_header: any;
    data_footer: any;
    isUsingLoading: boolean;
}
export default class NEXT_Layout_1 extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Head>
                    <title>{this.props.data_extra.title}</title>
                </Head>
                <React.Fragment>
                    <NEXT_Header data_extra={this.props.data_extra} data_header={this.props.data_header} isHiddenForLoading={this.props.isUsingLoading} />
                    <React.Fragment>
                        {this.props.isUsingLoading ? (
                            <React.Fragment>
                                {this.props.children}
                                <NEXT_Loading data_extra_loading={this.props.data_extra.loading} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>{this.props.children}</React.Fragment>
                        )}
                    </React.Fragment>
                    <NEXT_Footer data_extra={this.props.data_extra} data_footer={this.props.data_footer} isHiddenForLoading={this.props.isUsingLoading} />
                </React.Fragment>
            </React.Fragment>
        );
    }
}
