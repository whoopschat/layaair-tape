# layaair-tape
> A layaair game library

### Usage

```
> npm install layaair-tape
```

```html
<!-- include tape library -->
<script src="../node_modules/layaair-tape/dist/tape.js"></script>
```

### CLI

#### create new project
```
> layaair-tape create
```

#### build
```
> layaair-tape
  Usage: layaair-tape build [options]
    --input            input dir
    --output           output dir
    --env              [Optional] development || production(prod)
    --platform         [Optional] platform : h5 || android , def: h5
    --index            [Optional] index.html file def: index.html
    --version          [Optional] version code def: read package.json
    --buildnum         [Optional] version build num def: 0
    --jsfile           [Optional] jsfile def: code.js
    --projectname      [Optional] project name
    --packagename      [Optional] android package name
    --orientation      [Optional] android screen orientation
    --pngquant         [Optional] pngquant quality def:65-80
    --injection        [Optional] injection js file
    --zip              [Optional] [bool] zip build.zip
    --min              [Optional] [bool] uglify js
    --obfuscate        [Optional] [bool] obfuscate code
    --force            [Optional] [bool] ignore .lock file
    --x                [Optional] show this help
```

### Development
* make sure latest `node.js` installed
* install dependnecies by: `npm install`
* start development by: `npm start`
* make build by: `npm run build` 