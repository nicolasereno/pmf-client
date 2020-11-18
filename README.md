# PmfClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0.

## Download dipendenze

Per scaricare le dipendenze lanciare il comando `npm install`

## Development server

Per avviare il server di sviluppo locale, sulla porta di default lanciare:

`ng serve` oppure `ng s`

Per servire l'applicazione in una lingua diversa da quella di default (italiano), verificare l'esistenza della configurazione e della traduzione, quindi lanciare (ad esempio per l'inglese):

`ng serve --configuration=en`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Per creare i cmpilati in tutte le lingue definite nella configurazione, lanciare `ng build --prod --localize`

## Files di traduzione

Per ricreare il teplate in cui inserire le traduzioni nelle varie lingue lanciare:

`ng extract-i18n --output-path src/locale`

