import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
  HostListener,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-energy-chart',
  templateUrl: './energy-chart.component.html',
  styleUrl: './energy-chart.component.scss',
})
export class EnergyChartComponent implements AfterViewInit, OnChanges {
  @Input() chartHeight: string;
  @Input() xData: string[];
  @Input() yData: number[];
  @Input() chartConfig: {
    areaStyle?: Record<string, any>;
    lineStyle?: Record<string, any>;
  } = {};

  @ViewChild('chartContainer', { static: false }) chartContainer: ElementRef;
  chartInstance: echarts.ECharts;

  ngOnChanges(changes: SimpleChanges): void {
    let shouldUpdateChart = false;

    if (changes.xData && this.xData || changes.yData && this.yData) {
      shouldUpdateChart = true;
    }
    if (changes.chartHeight && this.chartHeight) {
      this.updateChartHeight();
      shouldUpdateChart = true;
    }
    if (Object.keys(changes.chartConfig).length > 0) {
      shouldUpdateChart = true;
    }

    shouldUpdateChart && this.updateChart();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initChart();
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  initChart(): void {
    if (this.chartContainer && this.chartContainer.nativeElement) {
      this.chartInstance = echarts.init(this.chartContainer.nativeElement);
      this.updateChartHeight();
      this.updateChart();
    }
  }

  updateChartHeight(): void {
    if (this.chartContainer && this.chartHeight) {
      this.chartContainer.nativeElement.style.height = this.chartHeight;
    }
  }

  updateChart(): void {
    if (!this.chartInstance || !this.xData || !this.yData) {
      return;
    }

    const xData = this.xData;
    const yData = this.yData;

    const { areaStyle, lineStyle } = this.chartConfig;

    const option = {
      animation: false,
      title: {
        left: 'center',
        textStyle: {
          color: '#ffffff',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
        axisLabel: {
          color: '#ffffff',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#ffffff',
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: yData,
          areaStyle: areaStyle || {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 255, 233, 0.5)' },
              { offset: 1, color: 'rgba(0, 77, 167, 0.5)' },
            ]),
          },
          lineStyle: lineStyle || {
            width: 2,
            color: 'rgba(0, 255, 233, 1)',
          },
          symbol: 'none',
        },
      ],
    };

    this.chartInstance.setOption(option);
    this.chartInstance.resize();
  }
}
