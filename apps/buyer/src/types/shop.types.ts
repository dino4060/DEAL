// NESTED TYPES //

export enum TShopStatus {
  LACK_INFO = 'LACK_INFO',
  REVIEWING = 'REVIEWING',
  LIVE = 'LIVE',
  DEACTIVATED = 'DEACTIVATED',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
  DELETED = 'DELETED',
}

export enum TShopBusiness {
  INDIVIDUAL = 'INDIVIDUAL',
  HOUSEHOLD = 'HOUSEHOLD',
  ENTERPRISE = 'ENTERPRISE',
}

// MAIN TYPES //

export type TShop = {
  id: number;
  status: TShopStatus;
  code: string;
  name: string;
  photo: string;
  contactEmail: string;
  contactPhone: string | null;
  businessType: TShopBusiness;
  sellerType: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

// PICK TYPES //

export type TShopLean = Pick<TShop,
  'id' | 'name' | 'photo'>;
