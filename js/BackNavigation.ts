
declare var tizen:any; // From Tizen SDK

export class BackNavigation {

    public static startListener() {
        window.addEventListener("tizenhwkey", function (ev:any) {
            let activePopup: any = null,
                page: any = null,
                pageId:string = "";

            if (ev.keyName === "back") {
                activePopup = document.querySelector(".ui-popup-active");
                page = document.getElementsByClassName("ui-page-active")[0];
                pageId = page ? page.id : "";

                if (pageId === "main" && !activePopup) {
                    try {
                        tizen.application.getCurrentApplication().exit();
                    } catch (ignore) {
                    }
                } else {
                    window.history.back();
                }
            }
        });
    }

}