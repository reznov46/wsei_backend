import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TokenExtractor } from '../../helpers/tokenExtractor';

@Module({
	imports: [HttpModule],
	providers: [TokenExtractor],
	exports: [TokenExtractor, HttpModule],
})
export class CommonAuthModule {}
