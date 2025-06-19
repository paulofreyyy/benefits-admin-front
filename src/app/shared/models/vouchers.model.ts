export interface Vouchers {
    userId: string;
    benefitId: string;
    status: VoucherStatus;
    value: number;
    issuedAt: Date;
    expiresAt: Date;
    usedAt?: Date;
}

export interface CreateVoucherDto {
    userId: string;
    benefitId: string;
    value: number;
    expiresAt: Date;
}

export enum VoucherStatus {
    ACTIVE = 'active',
    USED = 'used',
    EXPIRED = 'expired',
}