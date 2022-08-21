import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationsModule } from './donations/donations.module';
import { DateScalar } from './scalars/date-time';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    playground: false,
    typePaths: ['./**/*.graphql'],
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    driver: ApolloDriver,
    subscriptions: {
      'graphql-ws': true,
      'subscriptions-transport-ws': true
    }
  }), DonationsModule],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
