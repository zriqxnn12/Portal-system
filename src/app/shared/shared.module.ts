import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FcActionBarModule } from './components/fc-action-bar/fc-action-bar.module';
import { FcLoadingModule } from './components/fc-loading/fc-loading.module';
import { FcSelectOptionModule } from './components/fc-select-option/fc-select-option.module';
import { AbstractDebounceDirective } from './directives/abstract-debounce.directive';
import { DebounceKeyupDirective } from './directives/debounce-keyup.directive';
import { ClickOutsideDirective } from './directives/fc-clickoutside.directive';
import { FcNumberDirective } from './directives/fc-number.directive';
import { FcCurrencyPipe } from './pipes/fc-currency.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';

@NgModule({
  declarations: [
    FcCurrencyPipe,
    TimeFormatPipe,
    AbstractDebounceDirective,
    DebounceKeyupDirective,
    FcNumberDirective,
    ClickOutsideDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    FontAwesomeModule,
    FormsModule,
    TimeFormatPipe,
    ReactiveFormsModule,
    FcCurrencyPipe,
    AutoFocusModule,
    CalendarModule,
    TooltipModule,
    OverlayPanelModule,
    DialogModule,
    FcActionBarModule,
    DebounceKeyupDirective,
    FcNumberDirective,
    FcSelectOptionModule,
    ConfirmDialogModule,
    ClickOutsideDirective,
    FcLoadingModule,
  ],
  providers: [DialogService],
})
export class SharedModule {}
