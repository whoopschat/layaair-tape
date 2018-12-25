# layaair-tape
> A layaair game library

### Usage

#### 1.install
```
> npm install layaair-tape
```

#### 2.require
```js
require('layaair-tape');
```

or

```html
<!-- include tape library -->
<script src="../node_modules/layaair-tape/dist/tape.js"></script>
```

### CMD
```
> layaair-tape
  Usage: layaair-tape [options]
    --input            input dir
    --output           output dir
    --platform         [Optional] platform : h5 || facebook || qq || wechat || baidu || android , def: h5
    --env              [Optional] development || production(prod)
    --index            [Optional] index.html file def: index.html
    --version          [Optional] version code def: read package.json
    --buildnum         [Optional] version build num def: 0
    --jsfile           [Optional] jsfile def: code.js
    --appid            [Optional] app id
    --projectname      [Optional] project name
    --packagename      [Optional] package name
    --orientation      [Optional] orientation
    --pngquant         [Optional] pngquant quality def:65-80
    --zip              [Optional] [bool] zip build.zip
    --min              [Optional] [bool] uglify js
    --obfuscate        [Optional] [bool] obfuscate code
    --publish          [Optional] [bool] publish project
    --force            [Optional] [bool] ignore .lock file
    --x                [Optional] show this help
```

### Development
* make sure latest `node.js` installed
* install dependnecies by: `npm install`
* start development by: `npm start`
* make build by: `npm run build` 