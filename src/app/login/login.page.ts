import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  

  alertaOpen = false;
  mostrarAlerta(isShow: boolean){
    this.alertaOpen = isShow;
  }//Se crea una variable en false para luego volverla True si se desea mostrar una alerta Toast
  
  usuario:{
    apellido: string,
    contrasena: string,
    correo: string,
    carrera: string,
    nombre: string,
    nombre_usuario: string,
    tipo: string
  };
  username= ''
  password= ''	

  constructor(private api:ApiService, private router: Router, private navCtrl: NavController) {
    localStorage.setItem('online', 'false');
  }

  login(){
    this.api.getUsuario(this.username).subscribe(res=>{     
      this.usuario=res;
      console.log(this.usuario);
      if(this.password==this.usuario.contrasena){
        localStorage.setItem('online', 'true');
        if(this.usuario.tipo=='Profesor'){
          localStorage.setItem('profesor', 'true');
        }else{
          localStorage.setItem('profesor', 'false');
        }
        this.router.navigate(['/home'], {state:{ usuario: this.usuario},});
      }else{
        this.mostrarAlerta(true)
      }
      
    },(error)=>{
      console.log(error);
      this.mostrarAlerta(true)
    })
  }
  /*
  usuariosReg:{nombre:string, apellido:string, email:string, tipo:string, username:string, password:string, 
              carrera:string, ramos:Array<string>[]}[]=[]

  
  //Se crea el arreglo de usuarios con sus respectivos campos además de variables para recoger los datos del formulario
  

  constructor(private router: Router) {
    const localUsers = localStorage.getItem('usuariosRegistrados');
    if (localUsers) {
      this.usuariosReg = JSON.parse(localUsers);
    }
  }
  //Se crea un router para luego navegar a otros componentes y se consume del localStorage los usuarios registrados y 
  //se ordenan en formato JSON para su consumo


  login(){//La función busca en el arreglo de usuarios si el usuario y contraseña son coinciden y guarda los datos del usuario en la constante user
    const user = this.usuariosReg.find(user => user.username === this.username && user.password === this.password); 
    //Busca el usuario en el localStorage
    console.log(user)
    
    if(user){
      //Si el usuario con las credenciales existe se redirecciona al Home enviando los datos correspondientes
      this.router.navigate(['/home', {username: this.username, nombre: user.nombre, apellido: user.apellido, 
                                      email: user.email, tipo: user.tipo, carrera: user.carrera, ramos: user.ramos}]);
    } else {
      //Si el usuario no existe se invoca la alerta para que el usuario intente nuevamente
      this.mostrarAlerta(true)
    }
  }


  
  register() {
    // Agregar usuarios al arreglo
    this.usuariosReg.push({nombre:'Lucas', apellido:'Fernandez', email:'lu.fernandezm@duocuc.cl', tipo:'Alumno', username:'lufernandezm', password:'lucas123', carrera:'Ingenieria en Informática', ramos:[["Programación Web"], ["Programación de Base de datos"], ["Ingeniería de Software"], ["Mentalidad Emprendedora"]]},
                          {nombre:'Francisco', apellido:'Toloza', email:'fran.toloza@duocuc.cl', tipo:'Profesor', username:'frantoloza', password:'francisco123', carrera:'Ingenieria en Informática',ramos:[['Modelamiento de base de datos'],['Arquitectura'],['Programación de Base de datos'],['Consultas de Base de datos']]},
                          {nombre:'Matias', apellido:'Diaz', email:'mat.diaz@duocuc.cl', tipo:'Alumno', username:'matdiaz', password:'matias123', carrera:'Ingenieria en Informática',ramos:[['Inglés intermedio'],['Programación Web'], ['Programación de Base de datos'], ['Ingeniería de Software'], ['Mentalidad Emprendedora']]},
                          {nombre:'Carlos', apellido:'De Ferrari', email:'car.deferrari@duocuc.cl', tipo:'Alumno', username:'cardeferrari', password:'cardeferrari123', carrera:'Ingenieria en Sonido',ramos:[['Electroacústica'],['Sonido y acústica'],['Electricidad'],['Nivelación Matemática'],['Inglés básico I']]});
    // Almacenar arreglo formateado
    localStorage.setItem('usuariosRegistrados', JSON.stringify(this.usuariosReg));
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }*/

  ngOnInit(){//Se dejan los campos vacios al entrar a la página
    this.username = '';
    this.password = '';
  }
  

}
