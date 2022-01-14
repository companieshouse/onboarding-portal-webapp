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
    page.page_summary = await convertMarkDownToSanitisedHTML(page.page_summary);

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
            a: [ 'href', 'name', 'rel', 'target' ],
            img: [ 'src', "alt" ],
            iframe: [ 'class', 'width', 'height', 'src', 'title', 'frameborder', 'allow', 'allowfullscreen'],
            p: ['class'],
            ul: ['class']
          },
          selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
          allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
          allowedSchemesByTag: {},
          allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
          allowProtocolRelative: true,
          enforceHtmlBoundary: true
    };
}

/*
  Override Marked functions to add gov uk classes to elements we want
  Add the target="_blank" option to links so they open in new tabs
*/
const renderer = {
    list(body: string, ordered: boolean, start: string | number) {
        const type = ordered ? 'ol' : 'ul',
          startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        const classAtt = ' class="govuk-list govuk-list--bullet govuk-!-margin-top-8" ';
        return '<' + type + startatt + classAtt + '>\n' + body + '</' + type + '>\n';
      },
      paragraph(text: string) {
        return '<p class="govuk-body">' + text + '</p>\n';
      },
      link(href: string, title: string, text: string) {
        if (href === null) {
          return text;
        }
        let out = '<a href="' + href + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ' target="_blank" rel="noopener noreferrer">' + text + '</a>';
        return out;
      }
};


marked.use({ renderer });