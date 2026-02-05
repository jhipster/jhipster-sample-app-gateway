import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JvmMetrics } from 'app/admin/metrics/metrics.model';

@Component({
  selector: 'jhi-jvm-memory',
  templateUrl: './jvm-memory.html',
  imports: [NgbModule, KeyValuePipe, DecimalPipe],
})
export class JvmMemory {
  /**
   * Object containing all jvm memory metrics
   */
  jvmMemoryMetrics = input<Record<string, JvmMetrics>>();

  /**
   * Boolean field saying if the metrics are in the process of being updated
   */
  updating = input<boolean>();
}
