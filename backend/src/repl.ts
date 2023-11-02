import { repl } from '@nestjs/core';
import { AppModule } from './app.module';
// Read-Eval-Print-Loop (REPL)

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();