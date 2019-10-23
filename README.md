# Meetapp - Mobile

## Pré-requisitos

Ter instalado:

- Node
- Yarn
- Backend rodando (https://github.com/bguaitanele/rocketseat-meetapp)
- React-native cli instalado (https://www.npmjs.com/package/react-native-cli)
- Simulador de android ou ios, ou smartphone android ou ios
- Expo instalado (https://docs.expo.io/versions/v35.0.0/get-started/installation/)
- Expo instalado nos devices (caso opte por testar em um device físico e não simulador)

## Passos para instalação

### Preparando código

- Baixe o projeto do git
- Na raiz do projeto rode o comando abaixo para instalar as dependências:

```
yarn
```

### Definição de variáveis de ambiente

Faça uma cópia do arquivo **.evn.example** na raiz do projeto para **.env**. Essa configuração é essencial para a aplicação se comunicar com o backend.

## Rodando o projeto

Execute o comando abaixo na raiz do projeto para iniciar o expo:

```
yarn start
```

Ao iniciar o Expo, selecione as opções para conectar nos devices/simuladores Android e iOS

## Debug

A aplicação já está configurada para realizar o debug em ambiente local. Caso seja necessário configurar a url por conta de simulador ou backend externo, a configuração do novo host pode ser adicionada no arquivo .env, conforme exemplo abaixo:

```
#Reactotron
HOST_PORT =9090
HOST_URL =192.168.0.4
```
