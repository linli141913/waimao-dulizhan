export interface InquiryForm {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    country: string;
    products?: string[];
    quantity?: string;
    message?: string;
    sourcePage: string;
    recaptchaToken: string;
}
