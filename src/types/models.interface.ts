export interface Phone {
  number: string;
}

export interface Contact {
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  phones: Phone[];
}
