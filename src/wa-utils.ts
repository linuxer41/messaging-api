import { AnyMessageContent, WAMediaUpload } from "baileys";

export function GetMessageBodyBasedOnMimeType(file?: Express.Multer.File, message?: string) : AnyMessageContent {
    if( !file || file === undefined || message === undefined) {
        throw new Error("No file or message provided");
    }
	switch (file.mimetype) {
		case "application/pdf":
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
		case "application/msword":
			return {
				fileName: file.originalname,
				document: convertBufferToWAMediaUpload(file.buffer),
                mimetype: file.mimetype,
				caption: message
			};
		case "image/gif":
		case "image/jpeg":
		case "image/png":
			return {
				fileName: file.originalname,
				image: convertBufferToWAMediaUpload(file.buffer),
				mimetype: file.mimetype,
				caption: message
			};
		default:
			return {
                text: message
            }
	}
}

function convertBufferToWAMediaUpload(buffer: Buffer): WAMediaUpload {
    return buffer as WAMediaUpload;
}