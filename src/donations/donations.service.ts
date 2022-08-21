import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { DonationCreateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { OrderByParams } from 'src/graphql';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  create(createDonationInput: DonationCreateInput) {
    return this.prisma.donation.create({
      data: createDonationInput
    });
  }

  findAll(orderBy?: OrderByParams) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return this.prisma.donation.findMany({
      orderBy: { [field]: direction }
    });
  }

  async findOne(donationWhereUniqueInput: Prisma.DonationWhereUniqueInput) {
    const donation = await this.prisma.donation.findUnique({
      where: donationWhereUniqueInput,
    });

    if (!donation) throw new NotFoundException("Donation not found...");

    return donation;
  }

  async getTotal() {
    const { _sum } = await this.prisma.donation.aggregate({
      _sum: {
        count: true
      }
    });

    return _sum.count;
  }
}
