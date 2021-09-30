export interface Page {
    "__v": number;
    "_id": string;
    "createdAt": string;
    "id": string;
    "page_id": string;
    "page_summary": string;
    "paragraphs": Paragraph[];
    "published_at": string;
    "template_id": string;
    "updatedAt": string;
}

export interface Paragraph {
    "body": string;
    "heading": string;
}
