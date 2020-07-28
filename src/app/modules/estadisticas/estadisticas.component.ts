import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { AfiliadosService } from 'src/app/servicios/afiliados.service';
import { Afiliado } from 'src/app/modelos/afiliado';




@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

 // Pie
 public pieChartOptions: ChartOptions = {
  responsive: true,
};
total = 2500;
afis = 0;
faltantes = this.total - this.afis;
adhesiones = 0;
afiliaciones = 0;
pc_af=0;
pc_fal=0;
public pieChartLabels: Label[] = ['Faltantes', ['Afiliaciones','Adhesiones']];
public pieChartData: SingleDataSet = [this.faltantes, this.afis];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [];
public pieChartColors: Array < any > = [{
  backgroundColor: ['rgba(30, 139, 195, 1)', 'rgba(30, 130, 76, 1)', 'rgba(148,159,177,0.2)'],
  borderColor: ['rgba(30, 139, 195, 1)', 'rgba(30, 130, 76, 1)', 'rgba(148,159,177,1)']
}];

afiliados:Afiliado[]=[];
// para grafico de barras
public barChartLabels: Label[] = ['2006'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];

public barChartData: ChartDataSets[] = [
  { data: [65], label: 'Afiliados' },
  { data: [28], label: 'Adhesiones' }
];

constructor(private afiliadoService: AfiliadosService,) {
  monkeyPatchChartJsTooltip();
  monkeyPatchChartJsLegend();
}


  ngOnInit() {
    console.log('en inicio')
    this.afiliadoService.estadisticaAfiliado().subscribe(
      afs =>{this.afiliados = afs;
          this.afis = this.afiliados.length;
          this.faltantes = this.total - this.afis;
          this.pieChartData = [this.faltantes, this.afis];
          this.pc_fal = (this.faltantes/this.total)*100;
          this.pc_af = (this.afis/this.total)*100;
          this.pieChartLabels=[['Faltantes',this.faltantes.toString(), this.pc_fal.toString()+'%'],
                          ['Afiliac./Adh.',this.afis.toString(),this.pc_af.toString()+'%']];
              this.adhesiones = this.afiliados.filter(a => a.adherido === true).length;
        //       this.barChartLabels = ['2020'];
        this.barChartData = [
          { data: [47], label: 'Afiliados' },
          { data: [25], label: 'Adhesiones' }
        ];
      }
    )
  }

}
