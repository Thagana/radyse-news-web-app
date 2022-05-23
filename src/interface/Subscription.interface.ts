export interface Subscription {
    data: {
        _id: string;
        amount: number;
        customer: number;
        plan: number;
        status: string;
        id: number;
        domain: string;
        integration: number;
        start: number;
        quantity: number;
        authorization: number;
        invoice_limit: number;
        cron_expression: string;
        updatedAt: string;
        createdAt: string;
        next_payment_date: string;
        email_token: string;
        subscription_code: string;
        user_id: string;
        name: string;
    },
    message: string;
    success: boolean;
}
