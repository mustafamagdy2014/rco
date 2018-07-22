import { AttachmentType } from './AttachmentType';
import { SafeUrl } from '@angular/platform-browser';

export class Attachment {
    id: number;
    attachmentType: AttachmentType;
    fileSize: number;
    fileName: string;
    mimeType: string;
    thumbnail: SafeUrl;
    createdBy?: string;
    createdOn: Date;
    updatedBy?: string;
    updatedOn: Date;
    content: any;
    encodedContent: any;
    requestId: number;
}
