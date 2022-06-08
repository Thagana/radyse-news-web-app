export interface Verify {
  success: true;
  message: string;
  data: {
    customer: number;
    plan: number;
    integration: number;
    domain: "test";
    start: number;
    status: string;
    quantity: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
    next_payment_date: string;
  };
}
