import React from "react";
interface Props {
    data_extra_loading: any;
}
export default class NEXT_Loading extends React.Component<Props> {
    state = {
        statusDotsArr: [],
    };
    animateLoadingInner = () => {
        const statusDotsArr: Array<string> = [];
        setInterval(() => {
            statusDotsArr.push(".");
            if (statusDotsArr.length > 3) statusDotsArr.length = 0;
            this.setState({statusDotsArr});
        }, 200);
    };
    componentDidMount() {
        this.animateLoadingInner();
    }
    render(): React.ReactNode {
        return (
            <main className="loading__main main">
                <div className="loading__main_status">
                    <p className="loading__main_status_inner">{`${this.props.data_extra_loading.inner}${this.state.statusDotsArr.join("")}`}</p>
                </div>
            </main>
        );
    }
}
