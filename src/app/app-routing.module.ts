import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantillaComponent } from './contenido/plantilla/plantilla.component';
import { PlantillaloginComponent } from './contenido/plantillalogin/plantillalogin.component';
import { CategoriaComponent } from './contenido/categoria/categoria.component';
import { ProductoComponent } from './contenido/producto/producto.component';
import { PrincipalComponent } from './contenido/principal/principal.component';
import { ClienteComponent } from './contenido/cliente/cliente.component';
import { ProveedorComponent } from './contenido/proveedor/proveedor.component';
import { UsuarioComponent } from './contenido/usuario/usuario.component';
import { VentasComponent } from './contenido/ventas/ventas.component';
import { VentasinsComponent } from './contenido/ventasins/ventasins.component';
import { ComprasComponent } from './contenido/compras/compras.component';
import { ComprasinsComponent } from './contenido/comprasins/comprasins.component';
import { CajaComponent } from './contenido/caja/caja.component';
import { LoginComponent } from './contenido/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'plantillalogin', component: PlantillaloginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard]
  },
  {
    path: 'plantilla', component: PlantillaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cate', component: CategoriaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'producto', component: ProductoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'proveedor', component: ProveedorComponent, canActivate: [AuthGuard]
  },
  {
    path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]
  },
  {
    path: 'venta', component: VentasComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ventains', component: VentasinsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'compra', component: ComprasComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comprains', component: ComprasinsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'caja', component: CajaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
