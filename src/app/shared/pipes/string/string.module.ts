import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { CnpjPipe } from './cnpj.pipe';
import { CpfPipe } from './cpf.pipe';
import { DecodeURIComponentPipe } from './decode-uri-component.pipe';
import { DecodeURIPipe } from './decode-uri.pipe';
import { DocumentPipe } from './document.pipe';
import { EncodeURIComponentPipe } from './encode-uri-component.pipe';
import { EncodeURIPipe } from './encode-uri.pipe';
import { LatinizePipe } from './latinize.pipe';

import { LeftPadPipe } from './left-pad.pipe';
import { MatchPipe } from './match.pipe';
import { NewlinesPipe } from './newlines.pipe';
import { PadPipe } from './pad.pipe';
import { PhonePipe } from './phone.pipe';
import { RepeatPipe } from './repeat.pipe';
import { ReplacePipe } from './replace.pipe';
import { ReverseStrPipe } from './reverse-str.pipe';
import { RightPadPipe } from './right-pad.pipe';
import { SafePipe } from './safe.pipe';
import { SlugifyPipe } from './slugify.pipe';
import { SplitPipe } from './split.pipe';
import { StripTagsPipe } from './strip-tags.pipe';
import { TemplatePipe } from './template.pipe';
import { TestPipe } from './test.pipe';
import { TrimPipe } from './trim.pipe';
import { TruncatePipe } from './truncate.pipe';
import { UpperFirstPipe } from './upperfirst.pipe';
import { WithPipe } from './with.pipe';
import { WrapPipe } from './wrap.pipe';


@NgModule({
  declarations: [
    LeftPadPipe,
    MatchPipe,
    PadPipe,
    ReplacePipe,
    RightPadPipe,
    SplitPipe,
    TestPipe,
    TrimPipe,
    NewlinesPipe,
    CapitalizePipe,
    UpperFirstPipe,
    TemplatePipe,
    EncodeURIPipe,
    EncodeURIComponentPipe,
    DecodeURIPipe,
    DecodeURIComponentPipe,
    TruncatePipe,
    RepeatPipe,
    SafePipe,
    SlugifyPipe,
    StripTagsPipe,
    LatinizePipe,
    WrapPipe,
    WithPipe,
    ReverseStrPipe,
    CpfPipe,
    CnpjPipe,
    PhonePipe,
    DocumentPipe,
  ],
  exports: [
    LeftPadPipe,
    MatchPipe,
    PadPipe,
    ReplacePipe,
    RightPadPipe,
    SplitPipe,
    TestPipe,
    TrimPipe,
    NewlinesPipe,
    CapitalizePipe,
    UpperFirstPipe,
    TemplatePipe,
    EncodeURIPipe,
    EncodeURIComponentPipe,
    DecodeURIPipe,
    DecodeURIComponentPipe,
    TruncatePipe,
    RepeatPipe,
    SlugifyPipe,
    StripTagsPipe,
    LatinizePipe,
    WrapPipe,
    WithPipe,
    ReverseStrPipe,
    CpfPipe,
    CnpjPipe,
    PhonePipe,
    DocumentPipe,
  ],
})
export class NgStringPipesModule {
}
