import "./polyfill";
import bg from "./services/manager/bg";
import screen from "./services/manager/screen";
import audio from './services/audio';
import env from "./utils/env";
import runtime from "./services/runtime";
import utils from './services/utils';
import navigator from "./services/navigator/stack";
import popup from "./services/display/popupmanager";
import toast from "./services/display/toastmanager";
import Activity from "./services/display/activity";
import PopupView from "./services/display/popupview";
import ToastView from "./services/display/toastview";
import { init, init3D, start } from './services/init';

const Tape = {
    init,
    init3D,
    start,
    bg,
    screen,
    audio,
    env,
    runtime,
    utils,
    navigator,
    popup,
    toast,
    Activity,
    PopupView,
    ToastView,
}

if (typeof window !== "undefined") {
    (window as any).Tape = Tape;
}

export = {
    Tape
}
