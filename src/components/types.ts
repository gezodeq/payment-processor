// types.ts

// Importing necessary types from other libraries
import { DateTime } from 'luxon';

// Exporting types
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY';

export type PaymentMethod = 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';

export type PaymentProcessorConfig = {
  apiKey: string;
  apiSecret: string;
};

export type PaymentRequest = {
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  description?: string;
  customerId?: string;
};

export type PaymentResponse = {
  id: string;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type ProcessPaymentResult =
  | {
      status: 'SUCCESS';
      payment: PaymentResponse;
    }
  | {
      status: 'FAILED';
      error: string;
    };