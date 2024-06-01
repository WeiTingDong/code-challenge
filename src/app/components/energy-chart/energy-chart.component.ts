import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
  HostListener
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-energy-chart',
  templateUrl: './energy-chart.component.html',
  styleUrl: './energy-chart.component.scss',
})
export class EnergyChartComponent {
  @Input() xData: string[];
  @Input() yData: number[];
  @ViewChild('chartContainer', { static: false }) chartContainer: ElementRef;
  chartInstance: echarts.ECharts;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.xData && this.xData) {
      console.log('update', this.xData, this.yData);
      this.updateChart();
    }
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
      this.updateChart();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  }

  updateChart(): void {
    if (!this.chartInstance || !this.xData || !this.yData) {
      return;
    }

    const xData = this.xData;
    const yData = this.yData;

    const option = {
      animation: false,
      title: {
        text: 'Direct Radiation',
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
          show: false, // 横轴线
        },
        axisTick: {
          show: false, // 刻度线
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#ffffff',
        },
        axisLine: {
          show: false, // 纵轴线
        },
        axisTick: {
          show: false, // 刻度线
        },
        splitLine: {
          show: false, // 分隔线
        },
      },
      series: [
        {
          name: 'Direct Radiation',
          type: 'line',
          smooth: true,
          data: yData,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 255, 233, 0.5)' },
              { offset: 1, color: 'rgba(0, 77, 167, 0.5)' },
            ]),
          },
          lineStyle: {
            width: 2,
            color: 'rgba(0, 255, 233, 1)',
          },
          symbol: 'none', // 数据点
        },
      ],
    };

    this.chartInstance.setOption(option);
  }
}
