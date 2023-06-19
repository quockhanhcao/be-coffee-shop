import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  findAll() {
    const a = 1;
    return ['dragons', 'coffee'];
  }
}
