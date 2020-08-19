import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'authinfo',
  template: `
     
   <table class="table table-bordered table-sm">
    <tr>
      <td>Nome:</td>
      <td>{{formState.security.utenteNome}}</td>
    </tr>
    <tr>
      <td>Cognome:</td>
      <td>{{formState.security.utenteCognome}}</td>
    </tr>
     <tr>
      <td>Codice Fiscale:</td>
      <td>{{formState.security.utenteCodiceFiscale}}</td>
    </tr>
     <tr>
      <td>Data di nascita:</td>
      <td>{{formState.security.utenteDataDiNascita}}</td>
    </tr>
       <tr>
      <td>Origine autenticazione:</td>
      <td>{{formState.security.sourceAuth}}</td>
    </tr>
    </table>
   
<div class="alert alert-danger" role="alert">
  N.B. nel caso le informazioni di autenticazioni non fossero corrette cliccare immediatamente sul bottone seguente:
  <button class="btn btn-primary btn-block">ESCI DAL SEGUENTE MODULO</button>
</div>


   
 


 
    
  `,
})
export class FormlyAuthInfoFieldType extends FieldType {}

// <img [src]="{{to.svgImage | safeHtml}}" class="u-sizeFit">
// <img [src]="'data:image/svg+xml;base64,' + to.svgImageB64 | safeHtml ">
// "data:image/svg+xml;base64,"