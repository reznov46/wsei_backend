import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TokenExtractor } from '../../helpers/tokenExtractor';
import { AdminTokenProvider } from './adminTokenProvider';

@Module({
	imports: [HttpModule],
	providers: [TokenExtractor, AdminTokenProvider],
	exports: [TokenExtractor, AdminTokenProvider, HttpModule],
})
export class CommonAuthModule {}
