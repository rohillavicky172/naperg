

export interface Addresse {
  id: string;
  zip: string;
  name: string;
  type: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  state: string;
}

export const addressClass: Addresse = {
  id: '',
  zip: '',
  type: '',
  name: '',
  address1: '',
  address2: '',
  country: 'US',
  city: '',
  state: ''
}
