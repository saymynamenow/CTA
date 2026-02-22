import { IsEnum, IsNumberString, IsString } from 'class-validator';
import { assetType } from '../entities/loan.entity'
export class CreateLoanDTO {
  @IsString()
  borrower: string;
  
  @IsString()
  assetContract: string;

  @IsString()
  tokenId: string;

  @IsString()
  amount: string;

  @IsNumberString()
  borrowedUSDC: string;

  @IsNumberString()
  debtToRepay: string;

  @IsString()
  dueDate: number;
    
  @IsEnum(assetType)
  assetType: assetType;
}
