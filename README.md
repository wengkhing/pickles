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

Follow [this guide](https://asdf-vm.com/guide/getting-started.html#_2-download-asdf) to download `asdf` or just run these commands to install, assumed in a Linux environment:

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

## Run linter

`yarn --cwd services/messaging run lint`

## Run unit test

`yarn --cwd services/messaging run test`

## Deployment

If you already have AWS account setup, you could also deploy this on your AWS account by running:

`yarn --cwd services/messaging run deploy`

However, it is also required to do click ops, adding domain name as verified identity in AWS SES.

Assume that you have already own a domain name:
1. Create identity in SES Dashboard
2. Select domain and insert domain name
3. Click "Create Identity" and you will see a set of CNAME key-value pairs generated
4. Copy these CNAME key-value pairs to the domain name provider (eg. ionos, godaddy) and paste them in the DNS record manager

## Important, please take note

Renaming `appname` in [shared/constants/app.js](shared/constants/app.js) would affect deployment naming of all AWS resources within this repo, including serverless service name. Serverless service name is constructed by combining `appname` and microservice name defined in `package.json`. Most deployed AWS resources would be prefixed with `appName-serviceName`, eg. `wengkhing-pickles-messaging`, to make it easier to identify these resources.

## Assumptions

1. Before sending email with the deployed endpoint, email need to be whitelisted because AWS SES account is in [sandbox mode](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html).

2. Not allow to send free-text email, assume that in a production environment, all transactional emails should always be reviewed to prevent listed as spam and also to protect brand reputation. Allowing API to send free text email would mean that any email could be sent without going through review.

3. Simple pipeline setup using Github Workflows, assume that master branch for production environment and other branches for development environment. AWS key and secret need to be setup in Github. Go to repository settings -> Secrets -> Actions -> New repository secret

4. Monorepo setup, so that in future new microservices can be added here to provide better local development experience. For example, running `yarn` would install all dependencies on all microservices and `yarn workspaces start` would start all services locally with a single command.

5. [serverless-http](https://github.com/dougmoscrop/serverless-http) is used, meaning there would be only a single lambda function to serve all the endpoints. [handler.ts](services/messaging/handler.ts) would manage the list of endpints instead of configuring in [serverless.yml](services/messaging/serverless.yml).