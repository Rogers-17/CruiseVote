import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface ContestantPayload {
  name: string;
  photo_url: string;
  department: string;
  bio: string;
}

export interface ConUpdates {
  name?: string;
  photo_url?: string;
  department?: string;
  bio?: string;
}

export interface UpdateContestPayload {
  id: string;
  updates: ConUpdates;
}

export interface Votes {
  id: string;
  poll_id: string;
  contestant_id: string;
  vote_code_id: string;
  device_fingerprint: string;
  created_at: Timestamp;
}

export interface DeviceVotesCount {
  fingerprint: string;
  pollId: string;
}

export interface GetContestant{
  id: string;
  poll_id: string;
  name: string;
  photo_url: string;
  department: string;
  bio: string;
  vote_count: string;
  created_at: Timestamp;
}

export interface GenerateCodesPayload{
  pollId: string;
  prefix: string;
  count: number;
}