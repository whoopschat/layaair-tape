import bg from "./services/manager/bg";
import screen from "./services/manager/screen";
import audio from './services/audio';
import env from "./utils/env";

import ad from './services/platform/ad';
import app from './services/platform/app';
import rank from './services/platform/rank';
import other from './services/other';
import runtime from "./services/runtime";

import utils from './services/utils';
import navigator from "./services/navigator/stack";
import popup from "./services/display/popupmanager";
import toast from "./services/display/toastmanager";

import Activity from "./services/display/activity";
import PopupView from "./services/display/popupview";
import ToastView from "./services/display/toastview";

import { init, init3D, start, exit } from './services/platform/init';
import {
    showLoading,
    hideLoading,
    showModal,
    showToast,
    hideToast,
    vibrateLong,
    vibrateShort,
} from './services/comp';

const Tape = {

    init,
    init3D,
    start,
    exit,

    // interactive
    showLoading,
    hideLoading,
    showModal,
    showToast,
    hideToast,
    vibrateShort,
    vibrateLong,

    bg,
    screen,
    audio,
    env,

    ad,
    app,
    rank,
    other,
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
    // (window as any).runtime = runtime;
}

export = {
    Tape
}
