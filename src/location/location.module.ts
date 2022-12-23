import { Module } from '@nestjs/common';
import { LocationService } from '@/location/location.service';

@Module({
  providers: [LocationService],
  exports: [LocationService],
})

export class LocationModule {}
