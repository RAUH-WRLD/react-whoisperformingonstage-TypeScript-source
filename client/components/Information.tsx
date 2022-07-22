import React from "react";
import Link from "next/link";
interface Props {
    data_extra: any;
    data_main: any;
    className: string;
    isUsingLoading: boolean;
}
export default class NEXT_Information extends React.Component<Props> {
    render(): React.ReactNode {
        const styles = {
            backgroundImage: `url(${this.props.data_main.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
        };
        return (
            <React.Fragment>
                {this.props.isUsingLoading ? (
                    <main className={`${this.props.className}__main main loading`} style={styles}></main>
                ) : (
                    <main className={`${this.props.className}__main main`} style={styles}>
                        <div className="grid-container">
                            <div className={`${this.props.className}__main_title`}>
                                <h1 className={`${this.props.className}__main_title_inner`}>{this.props.data_extra.page.title}</h1>
                            </div>
                            <div className={`${this.props.className}__main_subtitle`}>
                                <h2 className={`${this.props.className}__main_subtitle_inner`}>{this.props.data_extra.page.subtitle}</h2>
                            </div>
                            <div className={`${this.props.className}__main_link`}>
                                <Link href={this.props.data_extra.hrefs[0]} className={`${this.props.className}__main_link_a`}>
                                    <a className={`${this.props.className}__main_link_a`}>{this.props.data_extra.links[0]}</a>
                                </Link>
                            </div>
                        </div>
                    </main>
                )}
            </React.Fragment>
        );
    }
}
