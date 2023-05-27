import {bootstrap} from "./modules/bootstrap";
import {messageHandler} from "./modules/messageHandler";
import {tabChangeHandler} from "./modules/tabChangeHandler";
import {webRequestHandler} from "./modules/webRequestHandler";
import {instantiateGlobalStore} from "../../global/store";

(async () => {
    await bootstrap()
})()

tabChangeHandler();
(async () => {
    const store = await instantiateGlobalStore();
    webRequestHandler(store)
    messageHandler(store);
})()