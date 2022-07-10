export interface BaseProduct {
    name: string;
    thumbnailUrls?: string[];
    description: string;
    publish_at: Date;
    createdBy: number;
}

export interface Product extends BaseProduct {
    id: number;
}
