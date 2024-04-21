import { Module } from '@nestjs/common';
import { DatasourceService } from './datasource.service';
import { TypeOrmModule } from '../datastore/typeorm.module';

@Module({
  imports: [TypeOrmModule],
  providers: [DatasourceService],
  exports: [DatasourceService],
})
export class DatasourceModule {}
