import { Component, OnInit } from '@angular/core';
import { CateService } from 'src/app/servicios/cate.service';



@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css']
})
export class PlantillaComponent implements OnInit {
  categoria: any;
  constructor(private catesvg: CateService) { }

  ngOnInit(): void {
    
    this.catesvg.cargarcate()
      .subscribe(res => {
      this.categoria = res;
      //console.log('Categoria: ', this.categoria);
    });
  }

}
