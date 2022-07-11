export interface BaseProduct {
    name: string;
    thumbnailUrls?: string[];
    description: string;
    publish_at: Date;
}

export interface Product extends BaseProduct {
    id: number;
}

export interface Products {
    [key: number]: Product;
}
