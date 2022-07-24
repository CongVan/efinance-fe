import { Payment } from './payment';

export interface Order {
  address: string;
  buyer: string;
  city: string;
  code: string;
  created_at: string;
  date: string;
  district: string;
  finish_date: string;
  id: string;
  pay_date: string;
  payment: Payment;
  payment_fee: number;
  payment_id: string;
  phone: string;
  recipient: string;
  service_fee: number;
  session_id: string;
  source: string;
  status: string;
  updated_at: string;
  total_income: number;
  verify_description: string;
  verify_status: 'OK' | 'WRONG';
  voucher_shop_price: number;
  ward: string;
}
