import type { Signals } from '@/constants';
import type { Request } from 'express';

interface ISignalRequestBody {
  symbol: string;
  signal: Signals;
}

type ISignalRequest = Request<unknown, unknown, ISignalRequestBody>;

export type { ISignalRequest };
