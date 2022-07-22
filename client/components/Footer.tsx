import React from "react";
interface Props {
    data_extra: any;
    data_footer: any;
    isHiddenForLoading: boolean;
}
export default class NEXT_Footer extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <footer className={`${this.props.data_extra.classname}__footer footer ${this.props.isHiddenForLoading ? "hidden" : ""}`}>
                <p className={`${this.props.data_extra.classname}__footer_inner footer__inner`}>
                    {this.props.data_footer.inner.map((inner_item: any, index: number) => {
                        return (
                            <React.Fragment key={`${Math.random()}-${index}`}>
                                {inner_item.href ? (
                                    <a href={inner_item.href} className={`${this.props.data_extra.classname}__footer_inner_a footer__inner_a`} target="_blank" rel="noreferrer noopener">
                                        {inner_item.inner}
                                    </a>
                                ) : (
                                    <span className={`${this.props.data_extra.classname}__footer_inner_span footer__inner_span`}>{inner_item}</span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </p>
                <div className={`${this.props.data_extra.classname}__footer_technologies footer__technologies not-selectable`}>
                    {this.props.data_footer.technologies.map((technology: string, index: number) => {
                        return (
                            <div className={`${this.props.data_extra.classname}__footer_technology footer__technology not-selectable`} key={`${Math.random()}-${index}`}>
                                <img className={`${this.props.data_extra.classname}__footer_technology_inner footer__technology_inner not-selectable`} src={technology} alt={technology} />
                            </div>
                        );
                    })}
                </div>
            </footer>
        );
    }
}
