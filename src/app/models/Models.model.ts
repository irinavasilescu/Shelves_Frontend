export class BooksSortedModel {
    fantasy?: BookModel[];
    classics?: BookModel[];
    fiction?: BookModel[];
    horror?: BookModel[];
    mistery?: BookModel[];
    comics?: BookModel[];
    dystopia?: BookModel[];
}

export class BookModel {
    id: string;
    book_name: string;
    author: string;
    file_name: string;
    image_name: string;
    s3_folder: string;
    genre: string;
    stars: string;
    description: string;
    s3_image_path?: string;
    limited_description?: string;
}

export class FileModel {
    lastModified: number;
    lastModifiedDate: any;
    name: string;
    size: number;
    webkitRelativePath: string;
}

export class FilesModel {
    FileList: FileModel[]
}