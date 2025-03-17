export interface Address {
    line1: string;
    line2: string;
    line3: string;
    neighborhood: string;
    city: string;
    state: string;
    postal_code: string;
    country_code: string;
};

export interface Delivery {
    address: Address;
    status: string;
    type: string;
    track_id: string;
    track_url: string;
    amount: number;
    delivery_forecast: string;
};

export interface Attribute {
    _id: string;
    key: string;
    value: string;
    name: string;
    sort: number;
};

export interface Rating {
    title: string;
    description: string;
    star: number;
    date: string;
    active: boolean;
};

export interface Coupon {
    id: string;
    code: string;
    name: string;
    discount: number;
    type: string;
};

export interface Promotion {
    discount: number;
    percentual: number;
};

export interface HistoryItem{
    id: string;
    seller_id: string;
    name: string;
    quantity: number;
    sku: string;
    image: string;
    amount: number;
    discount: number;
    original_amount: number;
};

export interface Product {
    id: string;
    seller_id: string;
    name: string;
    quantity: number;
    sku: string;
    image: string;
    status: string;
    price: number;
    discount: number;
    original_price: number;
    attributes: Attribute[];
    rating: Rating;
    coupon: Coupon;
    promotion: Promotion;
    amount: number;
    history: HistoryItem[];
    active: boolean;
};

export interface Invoice {
    id: string;
    createdAt: string;
    status: string;
};

export interface Customer {
    name: string;
    doc: string;
    email: string;
    phone: string;
    _id: string;
};

export interface Seller {
    id: string;
    name: string;
    email: string;
};

export interface Partner {
    id: string;
    name: string;
    doc: string;
    sales_commission: number;
    sales_percentual: number;
};

export interface Payment {
    amount: number;
    status: string;
    discount: number;
    method: string;
    installments: number;
    date: string;
};

type OrderCoupon = Coupon & {
    application: string;
};

export interface ReplacementProduct {
    type: string;
    reason: string;
    comment: string;
    products: {
        _id: string;
        attributes: Attribute[];
        quantity: number;
    }[];
};

export interface Order {
    _id: string;
    delivery: Delivery;
    products: Product[];
    invoices: Invoice[];
    customer: Customer;
    seller: Seller;
    partner: Partner;
    payment: Payment;
    coupon: OrderCoupon;
    order_seller_id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    replacement_product?: ReplacementProduct;
};
