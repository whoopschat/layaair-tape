import platform from "../utils/platform";
import screen from "./manager/screen";
import { fixWidth, fixHeight } from "./platform/wx/_size";

let _clubButton = null;

function showClubButton(icon: string, x: number, y: number, w: number, h: number) {
    if (!platform.isWechatApp()) {
        return;
    }
    try {
        let left = fixWidth(x + screen.getOffestX());
        let top = fixHeight(y + screen.getOffestY());
        let width = fixWidth(w);
        let height = fixHeight(h);
        let icons = ['green', 'white', 'dark', 'light'];
        hideClubButton();
        if (!_clubButton) {
            _clubButton = platform.execWX('createGameClubButton', {
                icon: icons.indexOf(icon) < 0 ? icons[0] : icon,
                style: {
                    left,
                    top,
                    width,
                    height
                }
            });
            if (_clubButton && icons.indexOf(icon) < 0) {
                _clubButton.image = icon;
            }
        }
        if (_clubButton) {
            _clubButton.style.left = left;
            _clubButton.style.top = top;
            _clubButton.style.width = width;
            _clubButton.style.height = height;
            _clubButton.show();
        }
    } catch (error) {
    }
}

function hideClubButton() {
    if (!platform.isWechatApp()) {
        return;
    }
    try {
        if (_clubButton) {
            _clubButton.style.left = -_clubButton.style.width;
            _clubButton.style.top = -_clubButton.style.height;
            _clubButton.hide();
            _clubButton.destroy();
            _clubButton = null;
        }
    } catch (error) {
    }
}

export default {
    showClubButton,
    hideClubButton,
}