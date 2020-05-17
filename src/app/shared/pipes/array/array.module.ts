import { NgModule } from '@angular/core';
import { ChunkPipe } from './chunk.pipe';
import { CountPipe } from './count.pipe';
import { DeepPipe } from './deep.pipe';
import { DropPipe } from './drop.pipe';

import { EmptyPipe } from './empty.pipe';
import { EveryPipe } from './every.pipe';
import { FirstOrDefaultPipe } from './first-or-default.pipe';
import { FlattenPipe } from './flatten.pipe';
import { HeadPipe } from './head.pipe';
import { InitialPipe } from './initial.pipe';
import { IntersectionPipe } from './intersection.pipe';
import { JoinBadgePipe } from './join-badge.pipe';
import { JoinPipe } from './join.pipe';
import { LastPipe } from './last.pipe';
import { MapPipe } from './map.pipe';
import { OrderByPipe } from './order-by.pipe';
import { PluckPipe } from './pluck.pipe';
import { RangePipe } from './range.pipe';
import { ReversePipe } from './reverse.pipe';
import { ShufflePipe } from './shuffle.pipe';
import { SomePipe } from './some.pipe';
import { TailPipe } from './tail.pipe';
import { TakeUntilPipe } from './take-until.pipe';
import { TakeWhilePipe } from './take-while.pipe';
import { TakePipe } from './take.pipe';
import { UnionPipe } from './union.pipe';
import { UniqPipe } from './uniq.pipe';
import { WherePipe } from './where.pipe';
import { WithoutPipe } from './without.pipe';


@NgModule({
  declarations: [
    EmptyPipe,
    HeadPipe,
    InitialPipe,
    LastPipe,
    JoinPipe,
    JoinBadgePipe,
    TailPipe,
    UniqPipe,
    WithoutPipe,
    MapPipe,
    WherePipe,
    RangePipe,
    PluckPipe,
    ReversePipe,
    OrderByPipe,
    CountPipe,
    SomePipe,
    EveryPipe,
    ShufflePipe,
    TakePipe,
    DropPipe,
    DeepPipe,
    ChunkPipe,
    FlattenPipe,
    FirstOrDefaultPipe,
    IntersectionPipe,
    UnionPipe,
    TakeWhilePipe,
    TakeUntilPipe,
  ],
  exports: [
    EmptyPipe,
    HeadPipe,
    InitialPipe,
    LastPipe,
    JoinPipe,
    JoinBadgePipe,
    TailPipe,
    UniqPipe,
    WithoutPipe,
    MapPipe,
    WherePipe,
    RangePipe,
    PluckPipe,
    ReversePipe,
    OrderByPipe,
    CountPipe,
    SomePipe,
    EveryPipe,
    ShufflePipe,
    TakePipe,
    DropPipe,
    DeepPipe,
    ChunkPipe,
    FlattenPipe,
    FirstOrDefaultPipe,
    IntersectionPipe,
    UnionPipe,
    TakeWhilePipe,
    TakeUntilPipe,
  ],
})
export class NgArrayPipesModule {
}
