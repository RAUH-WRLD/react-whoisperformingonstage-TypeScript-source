import React from "react";
import Link from "next/link";
interface Props {
    data_extra: any;
    data_header: any;
    isHiddenForLoading: boolean;
}
export default class NEXT_Header extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <header className={`${this.props.data_extra.classname}__header header grid-x ${this.props.isHiddenForLoading ? "hidden" : ""}`}>
                <div className={`${this.props.data_extra.classname}__header_logo header__logo small-12 medium-4 large-4 cell`}>
                    <Link href={this.props.data_header.navigation[0].href} className={`${this.props.data_extra.classname}__header_logo_inner header__logo_inner ${this.props.data_extra.indexOfCurrentPage === 0 ? "header__logo_inner_active" : ""}`}>
                        <a className={`${this.props.data_extra.classname}__header_logo_inner header__logo_inner ${this.props.data_extra.indexOfCurrentPage === 0 ? "header__logo_inner_active" : ""}`}>{this.props.data_header.logo}</a>
                    </Link>
                </div>
                <div className={`${this.props.data_extra.classname}__header_navigation header__navigation small-12 medium-8 large-8 cell`}>
                    <nav className={`${this.props.data_extra.classname}__header_navigation_nav header__navigation_nav`}>
                        <ul className={`${this.props.data_extra.classname}__header_navigation_ul header__navigation_ul`}>
                            {this.props.data_header.navigation.map((nav_item: {inner: string; href: string}, index: number) => {
                                return (
                                    <li className={`${this.props.data_extra.classname}__header_navigation_li header__navigation_li ${index === this.props.data_extra.indexOfCurrentPage ? "header__navigation_li_active" : ""}`} key={`${Math.random()}-${index}`}>
                                        <Link href={nav_item.href} className={`${this.props.data_extra.classname}__header_navigation_a header__navigation_a`}>
                                            <a className={`${this.props.data_extra.classname}__header_navigation_a header__navigation_a`}>{nav_item.inner}</a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}
