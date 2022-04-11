# Pickles Assessment

A simple email microservice with AWS SES.

Send email using API with preset templates.

## Pre-requisite

- nodejs 16.x
- yarn 1.x (yarn workspace is used)
- asdf (preferably, to make sure all developers using same version tools)
- Serverless 3
- VS Code extension: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 

## Getting Started

Follow [this guide](https://asdf-vm.com/guide/getting-started.html#_2-download-asdf) to download `asdf` or just run these commands, assumed in a Linux environment:

```sh
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.9.0
. $HOME/.asdf/asdf.sh
. $HOME/.asdf/completions/asdf.bash
```

After the installion of `asdf`, add all the plugins required in the project by running:

```sh
asdf plugin add nodejs
asdf plugin add awscli
asdf plugin add yarn
```

And then run `asdf install` to install all tools specified in `.tool-versions`.

## Install dependencies

Please take note that this is a monorepo, and the project make use of `yarn workspace`.

Run `yarn` to install dependencies for all projects in the monorepo.


## Start locally

`yarn --cwd services/messaging run start`

## Invoking send email endpoint

If you've [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed in VS Code, go to [this file - local.http](services/messaging/local.http). You would be able to send request right from the editor.

## Run unit test

`yarn --cwd services/messaging run test`

## Deployment

If you already have AWS account setup, you could also deploy this by running:

`yarn --cwd services/messaging run deploy`

However, it is also required to do click ops, adding domain name as verified identity in AWS SES.

## Assumptions


