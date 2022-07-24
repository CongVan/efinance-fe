export interface Payment {
  id: string;
  created_at: string;
  updated_at: string;
  date: string;
  order_code: string;
  amount: number;
  description: string;
  balance: number;
  source: string;
  status: string;
  address_to: string;
  session_id: string;
}
