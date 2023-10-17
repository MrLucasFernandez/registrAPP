import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class RestorePage implements OnInit {

  alertaOpen = false;
  alertaOpen2 = false;
  alertaOpen3 = false;
  alertaOpen4 = false;

  mostrarAlerta(isShow: boolean){
    this.alertaOpen = isShow;
  }
  mostrarAlerta2(isShow: boolean){
    this.alertaOpen2 = isShow;
  }
  mostrarAlerta4(isShow: boolean){
    this.alertaOpen4 = isShow;
  }
  
  //Se crean las variables y métodos para invocar cada alerta según las condiciones

  delay(time: number){
    return new Promise(resolve => setTimeout(resolve, time));
  }//Se crea una promesa para asignar un tiempo según un valor definido de espera
  async mostrarAlerta3(isShow: boolean){
    this.alertaOpen3 = isShow;
    await this.delay(3000);
    this.router.navigate(['/login']);
  }//Se muestra la alerta 3 al conseguir una restauración exitosa mostrando un mensaje que 
  //esperará el tiempo asignado en pantalla antes de volver al Login

  usuario:{
    apellido: string,
    contrasena: string,
    correo: string,
    carrera: string,
    nombre: string,
    nombre_usuario: string,
    tipo: string
  };
  
  username= '';
  password= '';
  password2= '';
  //Se crea el arreglo de usuarios con sus respectivos campos además de variables para recoger los datos del formulario


  constructor(private api:ApiService,private router: Router) {
  }
  restore(){
    if(this.password!=''||this.password2!=''){
      if(this.password==this.password2){
        this.api.getUsuario(this.username).subscribe(res=>{
          this.usuario=res;
          this.api.putUsuario(this.usuario.nombre_usuario,{contrasena: this.password,nombre: this.usuario.nombre, apellido: this.usuario.apellido, correo: this.usuario.correo, carrera: this.usuario.carrera, tipo: this.usuario.tipo,nombre_usuario: this.usuario.nombre_usuario}).subscribe(res=>{     
            this.usuario=res;
            console.log(this.usuario);
            
            this.mostrarAlerta3(true)
            
          },(error)=>{
            console.log(error);
            this.mostrarAlerta(true)
            
          })
        })
        ,(error)=>{
          console.log(error);
          console.log('errorGET')
          this.mostrarAlerta(true)
          
        }
      }else{
        this.mostrarAlerta2(true)
      }
    }else{
      if(this.password==''&&this.password2==''){
        this.mostrarAlerta4(true)
      }
      
    }
  }
  /*
  restore(){//La función busca en el arreglo de usuarios si el usuario coincide y guarda los datos de este en la 
            //constante user y la posición donde se encontraba en la variable index
    const user = this.usuariosReg.find(user => user.username == this.username);
    const index = this.usuariosReg.findIndex(user => user.username == this.username); 
    
    if (user){//Si el usuario existe se procedé a validar que las contraseñas ingresadas sean iguales
      console.log(user)
      if (this.password == this.password2) {//Si las contraseñas son iguales se reemplazan los datos del usuario antiguo del localStorage 
                                            //manteniendo todos a excepción de la nueva contraseña ingresada
        this.usuariosReg.splice(index, 1, {nombre: user?.nombre, apellido: user?.apellido, email: user?.email, tipo: user?.tipo, username: user?.username, password: this.password, carrera: user?.carrera, ramos: user?.ramos});
        
        localStorage.setItem('usuariosRegistrados', JSON.stringify(this.usuariosReg));
        //Se actualiza el arreglo con todos los usuarios nuevamente en el localStorage
        
        this.mostrarAlerta3(true)
        //Se muestra la confirmación del cambio exitoso de contraseña
        
      }else{//Si las contraseñas no son iguales se muestra la alerta correspondiente y se limpian los campos de estas
        this.mostrarAlerta2(true)
        
        this.password= '';
        this.password2= '';
      }
    }else{//Si el usuario no existe se invoca la alerta correspondiente y se limpian todos los campos
      this.mostrarAlerta(true)
      this.username= '';
      this.password= '';
      this.password2= '';
    }
  }
  */
  ngOnInit() {
    this.username= '';
    this.password= '';
    this.password2= '';
  }

}
