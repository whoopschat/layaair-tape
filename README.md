# layaair-tape 4.x
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
> tape
  Usage: tape [options]
    --input            input dir
    --output           output dir
    --platform         [Optional] h5 || wechat || qq || facebook def: h5
    --env              [Optional] development || production(prod)
    --index            [Optional] index.html file def: index.html
    --version          [Optional] version code def: read package.json
    --buildnum         [Optional] version build num def: 0
    --jsfile           [Optional] jsfile def: code.js
    --appid            [Optional] app id
    --projectname      [Optional] project name
    --orientation      [Optional] orientation
    --pngquality       [Optional] png quality def: 65-80
    --zip              [Optional] [bool] zip build.zip
    --minpng           [Optional] [bool] use pngquant
    --min              [Optional] [bool] uglify js
    --publish          [Optional] [bool] publish project
    --force            [Optional] [bool] ignore 'platform'-game.lock
    --x                [Optional] show this help
```

### Development
* make sure latest `node.js` installed
* install dependnecies by: `npm install`
* start development by: `npm start`
* make build by: `npm run build` 