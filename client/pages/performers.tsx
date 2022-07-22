import React from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import NEXT_Layout_1 from "../layouts/Layout_1";
interface Props {
    data: any;
}
export default class NEXT_Performers extends React.Component<Props> {
    private searchInputRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.searchInputRef = React.createRef();
    }
    state = {
        didLoad: false,
        performers_data: {
            images: [],
            date: "",
        },
        search_performers_data: {
            performers: [],
            pages: [],
        },
        pageIndex: 0,
        searchPage: 1,
        choosedButton: "popular_performers",
        isSearchDisable: true,
        query: "",
    };
    setLoadingStatus = (status: boolean) => this.setState({didLoad: status});
    setPerformersData = (res: any) => {
        this.setState({performers_data: res});
        this.setLoadingStatus(true);
    };
    setSearchPerformersData = (res: any) => {
        const search_performers_data = {
            pages: res.pages.sort(function (a: string, b: string) {
                return parseInt(a) - parseInt(b);
            }),
            performers: res.performers,
        };
        this.setPerformersData({
            images: [],
            date: "",
        });
        this.setState({pageIndex: 0});
        this.setState({search_performers_data});
    };
    processPagination = (index: number) => {
        const buttons = document.querySelectorAll(".performers__main_pagination_button");
        buttons.forEach((button: any, index: number) => (button.disabled = false));
        if (this.state.choosedButton === "search_performers") {
            const choosed = [...buttons].filter((button: any) => (button.innerHTML === `${index}` ? button : false));
            if (choosed[0]) (choosed[0] as HTMLButtonElement).disabled = true;
            else return false;
        } else (buttons[index] as HTMLButtonElement).disabled = true;
    };
    processCounts = () => document.querySelectorAll(".count-label").forEach((count: any, index: number) => (count ? count.classList.add("hidden") : false));
    processPaginationButton = (index: number) => {
        this.setState({pageIndex: index});
        this.parseAndGetPerformersData(index, this.state.choosedButton);
        this.setLoadingStatus(false);
        this.processPagination(index);
    };
    processPerformer = (performer: any, index: number, imgStyles: any) => {
        const performerElement = ReactHtmlParser(performer);
        const href = performerElement[1].props.href;
        const image = performerElement[1].props.children[1].props.src;
        const name = performerElement[3].props.children[3].props.children[1].props.children[0].props.children[0];
        const concerts = performerElement[3].props.children[4];
        return (
            <React.Fragment>
                <p className="performers__main_item_number">
                    {`${`${index + 1}`.split("").length === 1 ? `0${index + 1}` : `${index + 1}`}`}
                    <span className="performers__main_item_number_inner"> — </span>
                </p>
                <img src={image} alt={image} className="performers__main_item_image not-selectable" style={imgStyles} />
                <div className="performers__main_item_info">
                    <a href={href}>{name}</a>
                    <p className="performers__main_item_info_concerts">
                        {`${concerts.split(" ")[4]} CONCERTS `}
                        <span className="performers__main_item_info_concerts_inner">{`${this.props.data.performers.concerts_inner_part}`}</span>
                    </p>
                </div>
            </React.Fragment>
        );
    };
    processSearchPaginationButton = (page: string) => {
        const url = `${this.props.data.performers.parse.search_url.url_part_1}${page}${this.props.data.performers.parse.search_url.url_part_2}${encodeURIComponent(`${this.state.query}`)}${this.props.data.performers.parse.search_url.url_part_3}`;
        this.setState({searchPage: parseInt(page)});
        this.parseAndGetSearchPerformersData(url);
        this.setLoadingStatus(false);
        this.processPagination(parseInt(page));
    };
    processUrls = () => {
        const urls = document.querySelectorAll("#__next > main > div.performers__main_items > div > div > a");
        if (urls.length > 0) {
            urls.forEach((url: any, index: number) => {
                const urlArr = url.href.split("/");
                const href = `${this.props.data.performers.href_inner_part}${urlArr[urlArr.length - 2]}/${urlArr[urlArr.length - 1]}`;
                url.href = href;
                url.target = "_blank";
            });
        }
    };
    search = (query: string | undefined) => {
        const url = `${this.props.data.performers.parse.search_url.url_part_1}${1}${this.props.data.performers.parse.search_url.url_part_2}${encodeURIComponent(`${query}`)}${this.props.data.performers.parse.search_url.url_part_3}`;
        this.setState({searchPage: 1});
        this.setState({query});
        this.setLoadingStatus(false);
        this.parseAndGetSearchPerformersData(url);
    };
    parseAndGetSearchPerformersData = (url: string) => {
        axios
            .post("/api/getSearchPerformersData/", {
                url,
                selectors: this.props.data.performers.parse.search_selectors,
            })
            .then((res: any) => {
                if (res) {
                    this.setState({choosedButton: "search_performers"});
                    this.setSearchPerformersData(res.data);
                } else return false;
            });
    };
    parseAndGetPerformersData = (index: number, name: string) =>
        axios
            .post("/api/getPerformersData/", {
                url: name === "popular_performers" ? this.props.data.performers.parse.popular_urls[index] : this.props.data.performers.parse.trending_urls[index],
                selectors: name === "popular_performers" ? this.props.data.performers.parse.popular_selectors : this.props.data.performers.parse.trending_selectors,
                name,
            })
            .then((res: any) => (res ? this.setPerformersData(res.data) : false));
    toggleButton = (name: string, index: number) => {
        this.setState({pageIndex: index});
        this.setState({choosedButton: name});
        this.setState({isSearchDisable: true});
        this.setLoadingStatus(false);
        this.clearSearch({
            performers: [],
            pages: [],
        });
        this.parseAndGetPerformersData(index, name);
    };
    clearSearch = (res: any) => {
        this.setState({search_performers_data: res});
        this.setState({searchPage: 1});
        return ((this.searchInputRef.current as any).value = "");
    };
    componentDidMount() {
        this.parseAndGetPerformersData(this.state.pageIndex, this.state.choosedButton);
    }
    componentDidUpdate() {
        this.processUrls();
        if (this.state.search_performers_data.pages.length > 1) {
            this.processPagination(this.state.searchPage);
        }
        if (this.state.performers_data.images.length > 0) {
            this.processPagination(this.state.pageIndex);
            if (this.state.choosedButton === "popular_performers") this.processCounts();
            else return false;
        } else return false;
    }
    render(): React.ReactNode {
        const styles = {
            backgroundImage: `url(${this.props.data.main.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
        };
        const imgStyles = {
            backgroundImage: `url(${this.props.data.main.performer})`,
            backgroundSize: "100%",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
        };
        return (
            <NEXT_Layout_1 data_extra={this.props.data.performers} data_header={this.props.data.header} data_footer={this.props.data.footer} isUsingLoading={!this.state.didLoad}>
                <main className={`performers__main main ${!this.state.didLoad ? "loading" : ""}`} style={styles}>
                    <div className={`performers__main_buttons grid-x ${!this.state.didLoad ? "hidden" : ""}`}>
                        <div className="small-12 medium-12 large-4 cell">
                            <form
                                action="GET"
                                className="performers__main_search"
                                onSubmit={(event: any) => {
                                    event.preventDefault();
                                    return this.search(`${this.searchInputRef.current?.value}`);
                                }}
                                onChange={() => {
                                    if (this.searchInputRef.current) {
                                        if (this.searchInputRef.current.value.length > 0 && this.searchInputRef.current.value.length === 1) this.setState({isSearchDisable: false});
                                        if (this.searchInputRef.current.value.length === 0) this.setState({isSearchDisable: true});
                                    } else return false;
                                }}
                            >
                                <input type="search" className="performers__main_search_input" placeholder={this.props.data.performers.search.placeholder} ref={this.searchInputRef} />
                                <button className="performers__main_search_submit" disabled={this.state.isSearchDisable}>
                                    {this.props.data.performers.search.submit}
                                </button>
                            </form>
                        </div>
                        <div className="small-12 medium-12 large-4 cell">
                            <button className="performers__main_button" disabled={this.state.choosedButton === "popular_performers" ? true : false} onClick={() => this.toggleButton("popular_performers", 0)}>
                                {this.props.data.performers.buttons[0]}
                            </button>
                        </div>
                        <div className="small-12 medium-12 large-4 cell">
                            <button className="performers__main_button" disabled={this.state.choosedButton === "trending_performers" ? true : false} onClick={() => this.toggleButton("trending_performers", 0)}>
                                {`${this.props.data.performers.buttons[1]} `}
                            </button>
                            {this.state.performers_data.date.length > 0 ? <span className="performers__main_date">{` ${this.props.data.performers.date_inner_part} ${this.state.performers_data.date[0].toUpperCase()}`}</span> : null}
                        </div>
                    </div>
                    <div className={`performers__main_items ${!this.state.didLoad ? "hidden" : ""}`}>
                        <React.Fragment>
                            {this.state.performers_data.images.length > 0 ? (
                                <React.Fragment>
                                    {(this.state.performers_data as any).images.map((image: string, index: number) => {
                                        return (
                                            <div key={`${Math.random}-${index}`} className="performers__main_item not-selectable">
                                                <p className="performers__main_item_number">
                                                    {`${(this.state.performers_data as any).numbers[index]}`}
                                                    <span className="performers__main_item_number_inner"> — </span>
                                                </p>
                                                <img src={image} alt={image} className="performers__main_item_image not-selectable" style={imgStyles} />
                                                <div className="performers__main_item_info">
                                                    {ReactHtmlParser((this.state.performers_data as any).names[index])}
                                                    <p className="performers__main_item_info_counts">
                                                        <span className="performers-count-label">{this.props.data.performers.counts_inner_part}</span>
                                                        {ReactHtmlParser((this.state.performers_data as any).counts[index])}
                                                    </p>
                                                    <p className="performers__main_item_info_concerts">
                                                        {`${(this.state.performers_data as any).concerts[index]}`}
                                                        <span className="performers__main_item_info_concerts_inner">{`${this.props.data.performers.concerts_inner_part}`}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.state.search_performers_data.performers.length > 0 ? (
                                        <React.Fragment>
                                            {(this.state.search_performers_data.performers as any).map((performer: string, index: number) => {
                                                return (
                                                    <div key={`${Math.random}-${index}`} className="performers__main_item not-selectable">
                                                        {this.processPerformer(performer, index, imgStyles)}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <div className="performers__main_results">
                                                <p className="performers__main_results_inner">{this.props.data.performers.error_results}</p>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </div>
                    <div className={`performers__main_pages ${!this.state.didLoad ? "hidden" : ""}`}>
                        <div className={`performers__main_pagination ${!this.state.didLoad ? "hidden" : ""}`}>
                            {this.state.choosedButton === "search_performers" ? (
                                <React.Fragment>
                                    {(this.state.search_performers_data as any).pages.map((page: any, index: number) => {
                                        return (
                                            <button key={`${Math.random()}-${index}`} className="performers__main_pagination_button" onClick={() => this.processSearchPaginationButton(page)}>
                                                {page}
                                            </button>
                                        );
                                    })}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.state.choosedButton === "popular_performers" ? (
                                        <React.Fragment>
                                            {this.props.data.performers.parse.popular_urls.map((performer: any, index: number) => {
                                                return (
                                                    <button key={`${Math.random()}-${index}`} className="performers__main_pagination_button" onClick={() => this.processPaginationButton(index)}>
                                                        {index + 1}
                                                    </button>
                                                );
                                            })}
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {this.props.data.performers.parse.trending_urls.map((performer: any, index: number) => {
                                                return (
                                                    <button key={`${Math.random()}-${index}`} className="performers__main_pagination_button" onClick={() => this.processPaginationButton(index)}>
                                                        {index + 1}
                                                    </button>
                                                );
                                            })}
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </main>
            </NEXT_Layout_1>
        );
    }
}
