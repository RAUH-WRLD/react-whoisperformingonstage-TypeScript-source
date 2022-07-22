import needle from "needle";
import cheerio from "cheerio";
function finderParse($: any, selector: string, hasOwnAttributes: boolean, attr: string) {
    const searcherArr: Array<string> = [];
    if (hasOwnAttributes) {
        $(selector).each((_index: number, element: any) => {
            searcherArr.push(`${$(element).attr(`${attr}`)}`.replace(/\n/g, ""));
        });
    } else {
        $(selector).each((_index: number, element: any) => {
            searcherArr.push(`${$(element).html()}`.replace(/\n/g, ""));
        });
    }
    return searcherArr;
}
function performersParse(req: any, res: any) {
    needle.get(req.body.url, (err: any, html: any) => {
        if (err) res.send(err);
        const $ = cheerio.load(html.body);
        const names = finderParse($, req.body.selectors[0], false, "");
        const images = finderParse($, req.body.selectors[1], true, "src");
        const numbers = finderParse($, req.body.selectors[2], false, "");
        const counts = finderParse($, req.body.selectors[3], false, "");
        const concerts = finderParse($, req.body.selectors[4], false, "");
        const date = finderParse($, req.body.selectors[5], false, "");
        return res.send({
            names,
            images,
            numbers,
            counts,
            concerts,
            date,
        });
    });
}
function searchPerformersParse(req: any, res: any) {
    needle.get(req.body.url, (err: any, html: any) => {
        if (err) res.send(err);
        const $ = cheerio.load(html.body);
        const performers = finderParse($, req.body.selectors[0], false, "");
        const pages = finderParse($, req.body.selectors[1], false, "").filter((page: string) => (parseInt(page) ? page : null));
        const currentPage = finderParse($, req.body.selectors[2], false, "");
        pages.push(currentPage[0]);
        pages.sort();
        return res.send({
            performers,
            pages: pages,
        });
    });
}
export {performersParse, searchPerformersParse};
