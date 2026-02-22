import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDTO } from './dto/create-loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() dto: CreateLoanDTO) {
    return this.loanService.create(dto);
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }
}
