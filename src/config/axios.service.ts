import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosService {
  axios: AxiosInstance;
  domain: string | null = null;
  constructor(private configService: ConfigService) {
    this.domain = this.configService.get('DOMAIN');
    this.setConfig();
  }

  private setConfig() {
    this.axios = axios.create({
      baseURL: this.domain + '/api',
    });
  }
}
