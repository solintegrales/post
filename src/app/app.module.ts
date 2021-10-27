import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlantillaloginComponent } from './contenido/plantillalogin/plantillalogin.component';
import { PlantillaComponent } from './contenido/plantilla/plantilla.component';
import { SuperiorComponent } from './partes/superior/superior.component';
import { MenuComponent } from './partes/menu/menu.component';
// -----------------FIREBASE
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { CategoriaComponent } from './contenido/categoria/categoria.component';
import { FooterComponent } from './partes/footer/footer.component';
// formularios reactivos
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    PlantillaloginComponent,
    PlantillaComponent,
    SuperiorComponent,
    MenuComponent,
    CategoriaComponent,
    FooterComponent,
    ProductoComponent,
    PrincipalComponent,
    ClienteComponent,
    ProveedorComponent,
    UsuarioComponent,
    VentasComponent,
    VentasinsComponent,
    ComprasComponent,
    ComprasinsComponent,
    CajaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
