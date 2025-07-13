import { Module } from '@nestjs/common';
import { DeliveryMethodService } from './delivery_method.service';
import { DeliveryMethodController } from './delivery_method.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryMethod } from './schemas/delivery_method.schemas';
import { DeliveryMethodSchema } from './schemas/delivery_method.schemas';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryMethod.name, schema: DeliveryMethodSchema },
    ]),
  ],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService],
})
export class DeliveryMethodModule {}
