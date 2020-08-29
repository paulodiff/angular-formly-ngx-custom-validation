# angular-formly-ngx-custom-validation

Progetto sperimentale definizione di un form attraverso
l'uso di file di configurazione json

Sono definiti alcune tipologie di campi di input con le loro validazioni, ad esempio:

- codice fiscale
- CAP 
- iban
- euro
- radio
- checkbox
- upload file 
- svgCaptcha
- ecc.

La logica è di suddividere al momento in 3 json:

- la definizione del form
- dati aggiuntivi liste e sicurezza
- dati di inizializzazione

- poi dovrà essere impostato in un solo json

# Ngx-formly Custom Validator con Italia Bootastrap

Angular 9 + Ngx Formly + Json Validator + Italia Bootstrap

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-formly-ngx-custom-validation)

# Sicurezza

- quando viene richiesto il modulo (i dati json) vengono restituiti oltre ai dati del modulo anche (uuid identificativo della chiamata, svgCaptcha e domanda).
Lo uuid può essere usato anche come nonce per il cacolo dell hmac dei dati inviati

- per ogni file viene calcolato sha256 e passato al server che lo ricalcola per una verifica degli allegati arrivati

- viene calcolato un hmac con tutti i dati del model (in cui sono anche aggiunti gli hash256 dei file) la key del calcolo viene fornita dal server ed è una chiave di accesso ai dati. Al cacolo viene aggiunto nonce che è uuid

# logica applicativa simulata

1 - accesso all'app richiesta dei moduli - authguard
2 - invia ad autenticazione
