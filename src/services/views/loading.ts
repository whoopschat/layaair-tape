import screen from "../manager/screen";
import { BgView } from "./bg";

class LoadingView extends Laya.Image {

    private _angle = 0;

    constructor() {
        super();
        this.skin = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAATnSURBVHja7N0/iFxVHMXx7zHWaoqA+KezCIjYRrBQEQSL4L9IjH8whRElAXdJJKkSqw0mkIUERUWRaGRl1YBiHSJBTCfWFkZS2KkgVlmuRd7CuuzszGPm3fu7d8/pdmbYvfedz8zOPObdq5QSztaNDMAAfBQMwDEAxwAcA3AMwDEAxwAcA3AMYN2DpeonnFK6F/h9kzmqhWIn7dUADMAADMAADMAADMAADMAADMAADMAADMAADMAADMAADMAADMAADGC2AFJKdwL7JS0YAKSUtgHHgXcl/dM0gJTSDuBH4D5gUdLcVgbQlb8EPAdcBR6fBYKQALryfwB2rrk5K4JIANaVv5qrwGOS/m0KwIjysyOIAmBE+au5AjwxDYJQAMaUnxVBBABjyp8JgmgA9gEXJnjo4AhKA0gp3QJ8OaZ8gBvd+4HLrfwLeAN4rzSCkgC68s8DL05Q/rOSvm3tTeCkCE5KOtYSgB7lrwDPTFN+9I+BRRGUANCz/L2Svmr9RFAxBLkBlCg/PIBugG8BZ3IjyAmgVPlVACiFIBeAkuVXA6AngncknagBQOnyqwLQE8ExSScjA0gpCfisZPnVAciJIKV0GzC/yRxPTFn+x8D+kuVXCSD3K8EAY5+0/AQ8P2T51QKoFUHP8l+WdCHDmOoE0A3+KLBQA4KI5VcPoBYEUctvAkBPBHOSFl1+YwB6IPgNuH/ab9H0HNddwM/AjmjlNwVgAgTXgIclXS8wrp3c/H7j9kjlNwegm9Bx4ESU8teM6wHg8joERctvEkA3qQXgaJTyRyAoXn6zANYgeCFK+esQXALelvRJgPG0CaCb3B2S/iJYUkq3S/o7yFjaBeAYgGMAjgE4BuAYgGMAjgE4BuAYgDMkAOA6cHfGeZyRNN9AGcuMvxx8lvkJeMgADMAADMAADMAADMAADMAADMDnAXwewAAMwAAMwAAMwAAMwAAMwAAMwAAMwAAMwAAMoBoAKaXtkv4MeNDDXLPY8tXBp4A9xL06eF7SeQMYrvzD3Y+R1wd4XdJHBjBc+URBMGKFEIADJRG0tkbQWeDgiLuvAbsk/RGo/OIIWlolbLPyV/Mr8GDmVcLuAX7ZpPyiCFpZJ3CS8gEOSTpX4CB/CLwWcXwtrBQauvzoCGpfKzjsM6sWrDWvFl5V+VER1LhhhIAPJiz/QOnP2VMiOCLptAH8v/xPgVeGLr/bx3h5kzk+0gKCmjaNmrT8mZxhy7Rp1EYnrbIiqGXbuD7lvzqLc+wZt40riqCGjSOzl58TQE8EM9kSrxoAXflfAHtzlp8bQE8EpyUdaR5AyfJLAOj+5kZL3Q+KIOr28duAzycsf5+kpQHKKLV9/GHgVC4E4QB05S8DT5cqvySA3AhCAYhSfmkAPRGck3SoFQAHgbNjHrYCvDRk+REA9ESwW9J3rbwCLDH6GvkVYI+kixkOfnEAEz4pFiXNtfYeYCME2cqPBGAMgqnKj/4p4Btgd3fTDW5upHwx40EPA2AEgvclvdnyeYBbga+BJ4GnJH2f+YCHArAOwUzKDw1gDYJdkq4UONjhAHTjelTSpRn+vrgASiYqgAHmaQAGYAAGYAAGYAAGYAAGYAAGYAAGYAAGYAAGYAAGYAAGYAAGsCUBDHptYNMAnPZiAAZgAAbgGIBjAI4BOAbgGIBjAM4WyX8DACmu8Uz0WffUAAAAAElFTkSuQmCC';
        this.timer.frameLoop(1, this, this.update);
    }

    public setSize(size) {
        this.width = size;
        this.height = size;
        this.pivot(size / 2, size / 2);
    }

    private update() {
        this._angle += 3;
        if (this._angle >= 360) {
            this._angle = 0;
        }
        this.rotation = this._angle;
    }

}

export class LoadingContentView extends Laya.Sprite {

    private _maxW = 0;
    private _minW = 0;
    private _loadingSize = 0;
    private _padding = 0;
    private _fontSize = 0;
    private _radius = 0;
    private _loadingView: LoadingView = null;
    private _titleView = null;
    private _bgView = null;

    constructor() {
        super();
        let size = Math.min(screen.getDesignWidth(), screen.getDesignHeight());
        this._maxW = size * 0.6;
        this._minW = size * 0.2;
        this._loadingSize = size * 0.08;
        this._padding = size * 0.04;
        this._fontSize = size * 0.04;
        this._radius = size * 0.03;
        this._initBg();
        this._initImage();
        this._initTitle();
    }

    private _initBg() {
        this._bgView = new BgView();
        this._bgView.name = 'bg';
        this._bgView.alpha = 0.6;
        this._bgView.color = '#333333';
        this._bgView.radius = this._radius;
        this.addChild(this._bgView);
    }

    private _initTitle() {
        this._titleView = new Laya.Label()
        this._titleView.align = Laya.Stage.ALIGN_CENTER;
        this._titleView.valign = Laya.Stage.ALIGN_MIDDLE;
        this._titleView.wordWrap = true;
        this._titleView.name = 'title';
        this._titleView.fontSize = this._fontSize;
        this._titleView.color = '#ffffff';
        this._titleView.x = this._padding;
        this._titleView.y = this._padding;
        this.addChild(this._titleView);
    }

    private _initImage() {
        this._loadingView = new LoadingView;
        this._loadingView.setSize(this._loadingSize);
        this.addChild(this._loadingView);
    }

    public setContent(title) {

        this._loadingView.y = this._padding + this._loadingView.height / 2;

        if (title) {
            this._titleView.width = undefined;
            this._titleView.visible = true;
            this._titleView.text = title;
            if (this._titleView.width > this._maxW) {
                this._titleView.width = this._maxW;
            } else if (this._titleView.width < this._minW) {
                this._titleView.width = this._minW;
            }
            this._titleView.y = this._loadingView.y + this._loadingView.height / 2 + this._padding / 2;

            this._bgView.height = this._titleView.height + this._titleView.y + this._padding;
            this._bgView.width = this._titleView.width + 2 * this._padding;
        } else {
            this._titleView.visible = false;
            this._bgView.height = this._loadingView.height + 2 * this._padding;
            this._bgView.width = this._loadingView.width + 2 * this._padding;
        }

        this._bgView.callDraw();
        this._loadingView.x = this._bgView.width / 2;
        this.x = (screen.getDesignWidth() - this._bgView.width) / 2;
        this.y = (screen.getDesignHeight() - this._bgView.height) / 2;
    }

}


