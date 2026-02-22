import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan, LoanStatus } from './entities/loan.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async create(data: Partial<Loan>) {
    const loan = this.loanRepository.create(data);
    return this.loanRepository.save(loan);
  }

  async findAll() {
    return this.loanRepository.find();
  }

  async findActiveLoans() {
    return this.loanRepository.find({ where: { status: LoanStatus.ACTIVE } });
  }
}
