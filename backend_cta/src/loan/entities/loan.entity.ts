import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum assetType {
    ERC721 = 'ERC721',
    ERC1155 = 'ERC1155',
}

export enum LoanStatus { 
    ACTIVE = 'ACTIVE',
    REPAID = 'REPAID',
    LIQUIDATED = 'LIQUIDATED',
}

@Entity('loans')
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 42})
    @Index()
    borrower: string;   

    @Column({type: 'varchar', length: 42})
    assetContract: string;

    @Column({type: 'varchar'})
    tokenId: string;

    @Column({type: 'varchar'})
    amount: string;

    @Column({type: 'varchar'})
    borrowedUSDC: string;

    @Column({type: 'varchar'})
    debtToRepay: string;

    @Column({type: 'bigint'})
    dueDate: number;

    @Column({type: 'enum', enum: assetType})
    assetType: assetType;

    @Column({type: 'enum', enum: LoanStatus, default: LoanStatus.ACTIVE})
    status: LoanStatus;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}
