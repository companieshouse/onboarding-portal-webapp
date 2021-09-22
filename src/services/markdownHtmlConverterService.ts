import marked from 'marked';
import { IOptions } from 'sanitize-html';
import sanitizeHtml = require('sanitize-html');
import { Page } from '../types/page';

export async function convertMarkDownToSanitisedHTML(markDownString: string): Promise<string> {
    const unsanitisedHTML = marked(markDownString);
    const sanitisedHtml = sanitizeHtml(unsanitisedHTML, sanitiseOptions());
    return sanitisedHtml;
}

export async function convertPageToSanitisedHTML(page:Page): Promise<Page> {
    const paragraphs = page.paragraphs;
    paragraphs.forEach(async (paragraph) => {
        paragraph.body = await convertMarkDownToSanitisedHTML(paragraph.body);
    });

    return page;
}

function sanitiseOptions(): IOptions {
    return {
        allowedTags: [
            "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
            "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
            "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
            "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
            "em", "i", "iframe", "img", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
            "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
            "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"
          ],
          disallowedTagsMode: 'discard',
          allowedAttributes: {
            a: [ 'href', 'name', 'target' ],
            img: [ 'src', "alt" ],
            iframe: [ 'class', 'width', 'height', 'src', 'title', 'frameborder', 'allow', 'allowfullscreen']
          },
          selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
          allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
          allowedSchemesByTag: {},
          allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
          allowProtocolRelative: true,
          enforceHtmlBoundary: false
    };
}