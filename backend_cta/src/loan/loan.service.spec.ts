import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { Repository } from 'typeorm';
import { Loan, LoanStatus } from './entities/loan.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LoanService', () => {
  let service: LoanService;
  let repository: Repository<Loan>;
  const mockLoanRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService,
        {
          provide: getRepositoryToken(Loan),
          useValue: mockLoanRepository,
        }
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
    repository = module.get<Repository<Loan>>(getRepositoryToken(Loan));
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a loan', async () => {
      const dto = {
        borrower: '0x123',
        assetContract: '0xabc',
        tokenId: '1',
        amount: '1',
        borrowedUSDC: '1000000000000000000',
        debtToRepay: '1100000000000000000',
        dueDate: 1700000000,
        assetType: (Loan as any).assetType?.ERC721 || 'ERC721',
      };

      mockLoanRepository.create.mockReturnValue(dto);
      mockLoanRepository.save.mockResolvedValue(dto);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('findActiveLoans', () => {
    it('should return active loans only', async () => {
      const loans = [{ id: '1', status: LoanStatus.ACTIVE }];

      mockLoanRepository.find.mockResolvedValue(loans);

      const result = await service.findActiveLoans();

      expect(repository.find).toHaveBeenCalledWith({
        where: { status: LoanStatus.ACTIVE },
      });

      expect(result).toEqual(loans);
    });
  });
});
