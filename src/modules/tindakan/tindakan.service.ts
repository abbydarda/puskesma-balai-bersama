import * as _ from 'lodash';

import { Injectable } from '@nestjs/common';
import { TindakanRepository } from './tindakan.repository';

@Injectable()
export class TindakanService {
  constructor(private tindakanRepository: TindakanRepository) {}

  async findTindakanByDokter(user) {
    const { idPoli } = user;

    const tindakan = await this.tindakanRepository.findAll({
      include: {
        poli: true,
      },
      condition: {
        property: 'idPoli',
        value: idPoli,
      },
    });

    const result = _.map(tindakan, (item) => _.omit(item, ['poliTindakan']));

    return result;
  }
}
